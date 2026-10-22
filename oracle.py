import json, random
def dec2(n):
    w, f = divmod(n, 100)
    fs = str(f).zfill(2).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def sections(l, s):
    n = (l + s - 1)//s; sp = n*s - l
    tail = ", with nothing left over" if sp == 0 else f", leaving {sp} ft of the last one"
    return f"The run of {l} ft takes {n} " + ("section" if n == 1 else "sections") + f" at {s} ft each{tail}."
def trench(l, w, d):
    return f"The trench of {l} ft by {w} inches wide by {d} inches deep holds {dec2(hu(l*w*d*100,144))} cu ft."
def weight(v, d):
    lbs = v*d
    return f"The {v} cu ft at {d} pounds a cubic foot weighs {lbs} pounds, or {dec2(hu(lbs*100,2000))} tons."
def cost(n, sp, t, tp, l):
    c = n*sp + t*tp
    return (f"The {n} " + ("section" if n == 1 else "sections") + f" at ${dec2(sp)} and the {t} " + ("ton" if t == 1 else "tons") +
            f" at ${dec2(tp)} cost ${money(c)}, or ${money(hu(c,l))} a foot over the {l} ft.")
random.seed(751)
cases = [
 dict(fn="sections", args=["60","8"], expect=sections(60,8)),
 dict(fn="trench", args=["60","36","30"], expect=trench(60,36,30)),
 dict(fn="weight", args=["150","100"], expect=weight(150,100)),
 dict(fn="cost", args=["8","180","8","30","60"], expect=cost(8,18000,8,3000,60)),
]
for _ in range(25):
    l=random.randint(1,10000); s=random.randint(1,100)
    cases.append(dict(fn="sections", args=[str(l),str(s)], expect=sections(l,s)))
for _ in range(25):
    l=random.randint(1,10000); w=random.randint(1,240); d=random.randint(1,240)
    cases.append(dict(fn="trench", args=[str(l),str(w),str(d)], expect=trench(l,w,d)))
for _ in range(20):
    v=random.randint(1,100000000); d=random.randint(1,200)
    cases.append(dict(fn="weight", args=[str(v),str(d)], expect=weight(v,d)))
for _ in range(20):
    n=random.randint(1,100000); sp=random.randint(1,1000000); t=random.randint(1,1000000); tp=random.randint(1,1000000); l=random.randint(1,10000)
    cases.append(dict(fn="cost", args=[str(n),dec2(sp),str(t),dec2(tp),str(l)], expect=cost(n,sp,t,tp,l)))
errs = [["sections",["0","8"]],["sections",["60","0"]],["trench",["0","36","30"]],["trench",["60","0","30"]],["trench",["60","36","0"]],
 ["weight",["0","100"]],["weight",["150","0"]],["cost",["0","180","8","30","60"]],["cost",["8","0","8","30","60"]],["cost",["8","180","0","30","60"]],["cost",["8","180","8","0","60"]],["cost",["8","180","8","30","0"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
