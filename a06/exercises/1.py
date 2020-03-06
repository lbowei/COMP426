def groupcourse(l):
    m = {}
    for item in l:
        m[item[0]] = m.get(item[0], []) + [item[1]]
    
    M = {}
    allkeys = []
    for item in m.keys():
        allkeys.append(item)
        
    for i in range(len(allkeys)):
        for j in range(i+1, len(allkeys), 1):
            a = allkeys[i]
            b = allkeys[j]
            intersect = list(set(m[a]) & set(m[b]))
            M[a,b] = intersect
    print(M)
    return M
    

l = [['58', 'Math'],['45', 'Math'], ['58', 'English'], ['46','Physics'],['46','English']]
groupcourse(l)


def coursepath(lst):
    if not lst:
        return None
    course = []
    pre = []
    for item in lst:
        course.append(item[0])
        pre.append(item[1])
    
    s = set(course) | set(pre)
    
    start_set = s - set(course)
    start = start_set.pop()
    
    idx = pre.index(start)
    
    curr = start
    for i in range(len(course)//2):
        curr = course[idx]
        idx = pre.index(curr)
    return curr    
        
    
        

lst = [['g','h'],['a','b'], ['c','d'], ['b','c'], ['e','f'], ['d','e'],['f','g']]
coursepath(lst)



def coursepath(lst):
    child = {}
    parent = []
    child_lst = []
    for item in lst:
        child[item[0]] = item[1]
        child_lst.append(item[0])
        parent.append(item[1])
    
    allcourse = set(child_lst) | set(parent)
    
    start = allcourse - set(parent)
    end = allcourse - set(child_lst)
    for item in end:
        endpoint = item
    
    
    allpath = []
    path = []
    for item in start:
        while item != endpoint:
            path.append(item)
            item = child[item]
        path.append(endpoint)
        allpath.append(path)
        path = []
    
    res = []
    for item in allpath:
        res.append(item[(len(item)-1)//2])

        
    


lst = [['a','b'],['b','c'], ['e','b'], ['f','e']]
coursepath(lst)


from collections import defaultdict
def subdomainVisits(cpdomains):
        m = {}
        for item in cpdomains:
            times, domain = item.split()
            
            ls = domain.split('.')
            for i in range(len(ls)):
                sub = '.'.join(ls[i:])
                m[sub] = m.get(sub, 0) + int(times)
        return [' '.join([str(v), k]) for k, v in m.items()]
       
cpdomains = ["9001 discuss.leetcode.com"] 
subdomainVisits(cpdomains)


def findLength(A, B):
    maxlen = 0
    res = []
    dp = [[""] * (len(B) + 1) for _ in range(len(A) + 1)]
    
    for i in range(len(A) - 1, -1, -1):
        for j in range(len(B) - 1, -1, -1):
            if A[i] == B[j]:
                dp[i][j] = A[i] + " " +dp[i+1][j+1] 
                toList = dp[i][j].split()
                if maxlen < len(toList):
                    maxlen = len(toList)
                    res = toList
    print(res)
    return res
findLength(["a","1","2","3","4","5", "b", "d",'h', "e"],["g", "b", "d", "h","1","2","3","4","5"])


def textbuyandvisit(purchasedUser, history, ipandid):
    item_ipmap = {}
    for his in history:
        ip,item = his.split(', ')
        item_ipmap[item] = item_ipmap.get(item, [])+[ip]
    
    id_ipmap = {}
    for thing in ipandid:
        id, ip = thing.split(',')
        id_ipmap[id] = ip
    
    purchased_ip = []
    for item in purchasedUser:
        purchased_ip.append(id_ipmap[item])
    
    
    res=[]
    for key,val in item_ipmap.items():
        total = len(val)
        num = 0
        for item in val:
            if item in purchased_ip:
                num+=1
        res.append("{} of {} {}".format(num, total, key))
    print(res)
        

    
purchasedUser = ['A','B','C','D']
history = ['ip1, itemA', 'ip2, itemB', 'ip3, itemA', 'ip4, itemB','ip5, itemC']
ipandid = ['A,ip1', 'B,ip3', 'C,ip2', 'D,ip4']
textbuyandvisit(purchasedUser, history, ipandid)

def reach(grid, point):
    x,y = point
    row = len(grid)
    col = len(grid[0])
    res = []
    
    if 0<= x-1 <=row-1 and 0 <= y <= col-1 and grid[x-1][y] == '0':
        res.append([x-1,y])
    if 0<= x+1 <=row-1 and 0 <= y <= col-1 and grid[x+1][y] == '0':
        res.append([x+1,y])
    if 0<= x <=row-1 and 0 <= y-1 <= col-1 and grid[x][y-1] == '0':
        res.append([x,y-1])
    if 0<= x <=row-1 and 0 <= y+1 <= col-1 and grid[x][y+1] == '0':
        res.append([x,y+1])
        
    return res
        

grid = [["1","0","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
point = [0,0]
reach(grid,point)

def reach(grid, point): 
    s = set()
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '0':
                s.add((i,j))
    
    Q = [(point[0], point[1])]
    while Q:
        i, j = Q.pop(0)
        for item in [(i-1,j),(i+1,j),(i,j-1),(i,j+1)]:
            if item in s:
                s.remove(item)
                Q.append(item)
    return len(s) == 0
                

    
grid = [['1','0','0'],['1','1','0'],['1','1','0']]
# grid = [["1","0","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
point = [0,1]
reach(grid,point)




def shortPath(grid,start,end):
    t = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                t += 1    
    allpath = []
    path = []
    i= start[0]
    j = start[1]
    
    dfs(i, j, grid, path, allpath, t, end)
    
    for item in allpath:
        print(item)
        print('============')
    if len(allpath) == 0:
        return []
    else:
        shortest = allpath[0]
        for item in allpath:
            if len(item) < len(shortest):
                shortest = item
        res = shortest + [end]
        print(res)
        return res
    
def dfs(i, j, grid, path, allpath, t,end):
    if  i >= len(grid) or j >= len(grid[0]) or i < 0 or j < 0 or grid[i][j] == -1 or grid[i][j] == '#':
        return
    if grid[i][j] == 1:
        t -= 1
    if i == end[0] and j == end[1] and t != 0:
        return 
    
    
    if i == end[0] and j == end[1] and t == 0:
        allpath.append(path)
        
    tmp = grid[i][j]
    grid[i][j] = '#'
    dfs(i-1,j,grid, path+[[i,j]], allpath, t, end)
    dfs(i+1,j,grid, path+[[i,j]], allpath, t, end)
    dfs(i,j-1,grid, path+[[i,j]], allpath, t, end)
    dfs(i,j+1,grid, path+[[i,j]], allpath, t, end)
    grid[i][j] = tmp
    

grid = [[0,0,0],[0,1,0],[0,1,-1]]
start = [0,1]
end = [2,1]
shortPath(grid,start,end)
/*
Add your code for Game here
 */
