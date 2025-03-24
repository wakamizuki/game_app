import tkinter
import random
import time
"""
process_num = 0 初期値
process_num = 1,2 先手番
process_num = 1:コマを選択 
process_num = 2:コマを置く場所を選択

process_num = 3,4 後手番
process_num = 3:コマを選択 
process_num = 4:コマを置く場所を選択
"""
#フォント
FNT = ("Times New Roman", 60)
MINI_FNT = ("Times New Roman", 25)
#マスサイズ
MATH_SIZE = 200
COLOR=["pink","chocolate","deep sky blue","cyan","dark violet","DarkGrey","DarkGreen","DarkRed","DeepPink","DeepPink3","firebrick","hot pink","LightPink","lightgreen","wheat"]
THAT_COLOR="red"
# 丸, バツ, マス目を書くための定数
GO_LEFT=60
GO_DOWN=180

#ゲーム進行を管理する変数
process_num=0
#S, M, Lの内、何を選択したかを選んだかを示す変数
hold_mx=0
hold_my=0 
#勝ち負けを示す変数
kachi = 0
#何回ゲームを行ったかを示す変数(100回になったら引き分けにしよう!)
repeat_num = 0

#右側のパネルが触られたかを判定します!
TOUCH1=[
    [0,0],
    [0,0],
    [0,0]
]
TOUCH2=[
    [0,0],
    [0,0],
    [0,0]
]
NAME=[
    ["S1","S2"],
    ["M1","M2"],
    ["L1","L2"]
]
# 大中小の最大三層用のマス
MATH = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
MATH1=[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
MATH2=[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

def okareta(y ,x,math_number): #置かれたらMATH->MATH1->MATH2に移動
    MATH2[y][x] = MATH1[y][x]
    MATH1[y][x] = MATH[y][x]
    MATH[y][x] = math_number#ただ移動すれば良い(上から下に、ただし一番上はnumber)

def torareru(y,x): #置かれたの逆: MATH2->MATH1->MATHに移動
    MATH[y][x] = MATH1[y][x]
    MATH1[y][x] = MATH2[y][x]
    MATH2[y][x] = 0#ただ移動すれば良い(下から上に、ただし下は0)

def okeru(y,x,math_number):#置けるかおけないかの判定
    if math_number-MATH[y][x] >= 2 or (math_number-MATH[y][x] >= 1 and math_number%2 == 1):
        okareta(y,x,math_number)
        return 1
    else:
        return 0
from_math_flag=0
math_number=0
def decide_color():
    global THAT_COLOR
    THAT_COLOR=COLOR[random.randint(0,len(COLOR)-1)]

def click(e):
    global repeat_num,process_num, hold_my,hold_mx,from_math_flag,math_number #マス目からとったら1　外からなら0 
    print(process_num,"の過程です")
    if repeat_num == 200:
        repeat_num == 0
        replay()
        return
    CLICKED_MATH_X = int((e.x-20)/200)
    CLICKED_MATH_Y = int((e.y-20)/200)

    if process_num==1:#player1が選択します
        if CLICKED_MATH_Y>2: 
            return #次の行は盤面のやつを選択 　#下のやつは互換性を持たせるためにそのようにしてる
        if(CLICKED_MATH_X<3):    
            print("マス目の","[",CLICKED_MATH_Y+1,"]","[",CLICKED_MATH_X+1,"]","には",MATH[CLICKED_MATH_Y][CLICKED_MATH_X],"の物体が入っている")
            if MATH[CLICKED_MATH_Y][CLICKED_MATH_X]%2==1:
                hold_my=CLICKED_MATH_Y
                math_number=MATH[CLICKED_MATH_Y][CLICKED_MATH_X]
                hold_mx=CLICKED_MATH_X
                process_num=2
                torareru(CLICKED_MATH_Y,CLICKED_MATH_X)
                masume()
                from_math_flag=1
                return
    
        if CLICKED_MATH_X>5 or CLICKED_MATH_X<3 or CLICKED_MATH_Y>2: 
            return
        if TOUCH1[CLICKED_MATH_Y][CLICKED_MATH_X-3]==1:
            cvs.create_text(500, 650, text="使用されています", font=MINI_FNT, fill="lime")
            return
        if TOUCH1[CLICKED_MATH_Y][CLICKED_MATH_X-3]==0:
            hold_my=CLICKED_MATH_Y
            math_number=2*CLICKED_MATH_Y+1
            hold_mx=CLICKED_MATH_X
            process_num=2
            TOUCH1[CLICKED_MATH_Y][CLICKED_MATH_X-3]=1
            masume()
            from_math_flag=0
            hantei()
            syouhai()
            return
    if process_num==3:#player2が選択します
        if CLICKED_MATH_Y>2: 
            return #次の行は盤面のやつを選択
        if(CLICKED_MATH_X<3):    
            print("マス目の","[",CLICKED_MATH_Y+1,"]","[",CLICKED_MATH_X+1,"]","には",MATH[CLICKED_MATH_Y][CLICKED_MATH_X],"の物体が入っている")
            if MATH[CLICKED_MATH_Y][CLICKED_MATH_X]%2==0 and MATH[CLICKED_MATH_Y][CLICKED_MATH_X]!=0:
                hold_my=CLICKED_MATH_Y
                math_number=MATH[CLICKED_MATH_Y][CLICKED_MATH_X]
                hold_mx=CLICKED_MATH_X
                process_num=4
                torareru(CLICKED_MATH_Y,CLICKED_MATH_X)
                masume()
                from_math_flag=1
                return
        if CLICKED_MATH_X>5 or CLICKED_MATH_X<3 or CLICKED_MATH_Y>2: 
            return
        if TOUCH2[CLICKED_MATH_Y][CLICKED_MATH_X-3]==1:
            cvs.create_text(500, 650, text="使用されています", font=MINI_FNT, fill="lime")
            return
        if TOUCH2[CLICKED_MATH_Y][CLICKED_MATH_X-3]==0:
            hold_my=CLICKED_MATH_Y
            math_number=2*CLICKED_MATH_Y+2
            hold_mx=CLICKED_MATH_X
            process_num=4
            TOUCH2[CLICKED_MATH_Y][CLICKED_MATH_X-3]=1
            masume()
            from_math_flag=0
            hantei()
            syouhai()
            return
    if process_num==2:#先手番　
        if e.x>=300 and e.x<=550 and e.y>=643 and e.y<=700: 
            if from_math_flag==0:
                process_num=1
                TOUCH1[hold_my][hold_mx-3]=0
                masume()
                return
            else: 
                process_num=1
                okareta(hold_my,hold_mx,math_number)
                masume()
                return
        if CLICKED_MATH_X>2 or CLICKED_MATH_Y>2:
            return
        print(math_number,"の強さ(O)を保持")
        if okeru(CLICKED_MATH_Y,CLICKED_MATH_X,math_number)==1:#############変更点
            MATH[CLICKED_MATH_Y][CLICKED_MATH_X]=math_number
            repeat_num = repeat_num + 1
            process_num=3
            masume()
            time.sleep(0.5)
            hantei()
            syouhai()
    if  process_num==4:#先手番　
        if e.x>=300 and e.x<=550 and e.y>=643 and e.y<=700: 
            if from_math_flag==0:
                process_num=3
                TOUCH2[hold_my][hold_mx-3]=0
                masume()
                return
            else: 
                process_num=3
                okareta(hold_my,hold_mx,math_number)
                masume()
                return
        if CLICKED_MATH_X>2 or CLICKED_MATH_Y>2:
            return
        print(math_number,"の強さ(X)を保持")
        if okeru(CLICKED_MATH_Y,CLICKED_MATH_X,math_number)==1:
            MATH[CLICKED_MATH_Y][CLICKED_MATH_X]=math_number
            repeat_num = repeat_num + 1
            process_num=1
            masume()
            time.sleep(0.5)
            hantei()
            syouhai()
def hantei():
    global kachi
    kachi = 0
    for n in range(1, 3):#縦,横、斜めの順に、"判定"をします
        if MATH[0][0]%2==n%2 and MATH[1][0]%2==n%2 and MATH[2][0]%2==n%2 and MATH[0][0]!=0 and MATH[1][0]!=0 and MATH[2][0]!=0:
            kachi = n
        if MATH[0][1]%2==n%2 and MATH[1][1]%2==n%2 and MATH[2][1]%2==n%2 and MATH[0][1]!=0 and MATH[1][1]!=0 and MATH[2][1]!=0:
            kachi = n
        if MATH[0][2]%2==n%2 and MATH[1][2]%2==n%2 and MATH[2][2]%2==n%2 and MATH[0][2]!=0 and MATH[1][2]!=0 and MATH[2][2]!=0:
            kachi = n
        if MATH[0][0]%2==n%2 and MATH[0][1]%2==n%2 and MATH[0][2]%2==n%2 and MATH[0][0]!=0 and MATH[0][1]!=0 and MATH[0][2]!=0:
            kachi = n
        if MATH[1][0]%2==n%2 and MATH[1][1]%2==n%2 and MATH[1][2]%2==n%2 and MATH[1][0]!=0 and MATH[1][1]!=0 and MATH[1][2]!=0:
            kachi = n
        if MATH[2][0]%2==n%2 and MATH[2][1]%2==n%2 and MATH[2][2]%2==n%2 and MATH[2][0]!=0 and MATH[2][1]!=0 and MATH[2][2]!=0:
            kachi = n
        if MATH[0][0]%2==n%2 and MATH[1][1]%2==n%2 and MATH[2][2]%2==n%2 and MATH[0][0]!=0 and MATH[1][1]!=0 and MATH[2][2]!=0:
            kachi = n
        if MATH[0][2]%2==n%2 and MATH[1][1]%2==n%2 and MATH[2][0]%2==n%2 and MATH[0][2]!=0 and MATH[1][1]!=0 and MATH[2][0]!=0:
            kachi = n
def syouhai():#勝ち負け決まってたら、終わりにします
    global repeat_num
    if kachi == 1:
        cvs.create_text(300, 300, text="先手の勝ち！", font=FNT, fill="cyan")
        repeat_num = 200
    if kachi == 2:
        cvs.create_text(300, 300, text="後手の勝ち！", font=FNT, fill="gold")
        repeat_num = 200
    if kachi == 0 and repeat_num == 200:
        cvs.create_text(300, 300, text="引き分け", font=FNT, fill="lime")#200になったら引き分け
def replay():#これは取っておきたい
    global repeat_num,process_num
    repeat_num = 0
    process_num=0#順番も0にするよ
    for y in range(3):
        for x in range(3):
            MATH[y][x] = 0
            MATH1[y][x] = 0
            MATH2[y][x] = 0#マス目を全部0にするよ
    for y in range(3):
        for x in range(2):
            TOUCH1[y][x]=0
            TOUCH2[y][x]=0
    masume()

def masume():
    cvs.delete("all")
    global process_num
    print(process_num)
    if process_num==0:
        decide_color()
        process_num=1#次に移動する
    cvs.delete("all")
    #テキスト書く用
    for i in range(0, 4):#線を引くやつ
        n = MATH_SIZE*i+20
        cvs.create_line(n, 0, n-10, MATH_SIZE, n+10, MATH_SIZE*2, n, MATH_SIZE*3, fill=THAT_COLOR, width=8, smooth= True)
        cvs.create_line(0, n, MATH_SIZE, n-10, MATH_SIZE*2, n+10, MATH_SIZE*3, n, fill=THAT_COLOR, width=8, smooth= True)
    #ボタンとテキストを書くやつ
    for i in range(0, 2):#線を引くやつ
        for j in range(0,3):#縦に書いていきます
            n = 600+MATH_SIZE*i+30 
            h = MATH_SIZE*j+20#縦です
            cvs.create_rectangle(n, h, n+MATH_SIZE, h+MATH_SIZE,fill="seashell",outline="snow4",width="5")
            cvs.create_text(n+170, h+30, text=NAME[j][i], font=FNT, fill="cyan4")
    #右側に丸を描くやつ
    if process_num==1 or process_num==2:##円を描いていく
        for i in range(0, 2):#線を引くやつ
            for j in range(0,3):#縦に書いていきます
                if(TOUCH1[j][i]==0):
                    X=600+MATH_SIZE*i
                    Y=MATH_SIZE*j
                    if j==0: 
                        cvs.create_oval(X+GO_LEFT+30, Y+GO_LEFT+30, X+GO_DOWN-30, Y+GO_DOWN-30, outline="skyblue", width=13)
                    elif j==1:
                        cvs.create_oval(X+GO_LEFT+20, Y+GO_LEFT+20, X+GO_DOWN-20, Y+GO_DOWN-20, outline="skyblue", width=23)
                    else :
                        cvs.create_oval(X+GO_LEFT, Y+GO_LEFT, X+GO_DOWN, Y+GO_DOWN, outline="skyblue", width=33)
    #右側にバツを描くやつ
    if process_num==3 or process_num==4:##ばつを描いていく
        for i in range(0, 2):#線を引くやつ
            for j in range(0,3):#縦に書いていきます
                if(TOUCH2[j][i]==0):
                    X=600+MATH_SIZE*i
                    Y=MATH_SIZE*j
                    if j==0:
                        cvs.create_line(X+GO_LEFT+30, Y+GO_LEFT+30, X+GO_DOWN-30, Y+GO_DOWN-30, fill="pink", width=12)
                        cvs.create_line(X+GO_DOWN-30, Y+GO_LEFT+30, X+GO_LEFT+30, Y+GO_DOWN-30, fill="pink", width=12)
                    elif j==1:
                        cvs.create_line(X+GO_LEFT+20, Y+GO_LEFT+20, X+GO_DOWN-20, Y+GO_DOWN-20, fill="pink", width=19)
                        cvs.create_line(X+GO_DOWN-20, Y+GO_LEFT+20, X+GO_LEFT+20, Y+GO_DOWN-20, fill="pink", width=19)
                    else:
                        cvs.create_line(X+GO_LEFT, Y+GO_LEFT, X+GO_DOWN, Y+GO_DOWN, fill="pink", width=27)
                        cvs.create_line(X+GO_DOWN, Y+GO_LEFT, X+GO_LEFT, Y+GO_DOWN, fill="pink", width=27)

    for y in range(3):#盤面を描くやつ
        for x in range(3):
            X = x * MATH_SIZE
            Y = y * MATH_SIZE ##1,3,5は丸　2,4,6はばつ  #masu2には　小　　masu1には　中がいる
            if MATH[y][x] == 1:
                cvs.create_oval(X+GO_LEFT+30, Y+GO_LEFT+30, X+GO_DOWN-30, Y+GO_DOWN-30, outline="skyblue", width=13)
            if MATH[y][x] == 2:
                cvs.create_line(X+GO_LEFT+30, Y+GO_LEFT+30, X+GO_DOWN-30, Y+GO_DOWN-30, fill="pink", width=12)
                cvs.create_line(X+GO_DOWN-30, Y+GO_LEFT+30, X+GO_LEFT+30, Y+GO_DOWN-30, fill="pink", width=12)
            if MATH[y][x] == 3:
                cvs.create_oval(X+GO_LEFT+20, Y+GO_LEFT+20, X+GO_DOWN-20, Y+GO_DOWN-20, outline="skyblue", width=23)
            if MATH[y][x] == 4:
                cvs.create_line(X+GO_LEFT+20, Y+GO_LEFT+20, X+GO_DOWN-20, Y+GO_DOWN-20, fill="pink", width=19)
                cvs.create_line(X+GO_DOWN-20, Y+GO_LEFT+20, X+GO_LEFT+20, Y+GO_DOWN-20, fill="pink", width=19)
            if MATH[y][x] == 5:
                cvs.create_oval(X+GO_LEFT, Y+GO_LEFT, X+GO_DOWN, Y+GO_DOWN, outline="skyblue", width=33)
            if MATH[y][x] == 6:
                cvs.create_line(X+GO_LEFT, Y+GO_LEFT, X+GO_DOWN, Y+GO_DOWN, fill="pink", width=27)
                cvs.create_line(X+GO_DOWN, Y+GO_LEFT, X+GO_LEFT, Y+GO_DOWN, fill="pink", width=27)

    cvs.create_text(780, 680, text="1.右側からもしくは盤面から駒を選択!", font=MINI_FNT, fill="cyan3")
    cvs.create_text(760, 730, text="2.左側から置く盤面を選択!", font=MINI_FNT, fill="cyan3")
    if(process_num==1 or process_num==2):
        cvs.create_text(150, 680, text="現在先手の番です", font=MINI_FNT, fill="cyan3")
        if(process_num==2):
            cvs.create_rectangle(300, 640, 550, 700,fill="beige",outline="snow4",width="5")
            cvs.create_text(425, 670, text="取り消しボタン", font=MINI_FNT, fill="blue violet")
    if(process_num==3 or process_num==4):
        cvs.create_text(150, 680, text="現在後手の番です", font=MINI_FNT, fill="pink")
        if(process_num==4):
            cvs.create_rectangle(300, 640, 550, 700,fill="beige",outline="snow4",width="5")
            cvs.create_text(425, 670, text="取り消しボタン", font=MINI_FNT, fill="blue violet")
    if(repeat_num == 0 and process_num==1):
        cvs.create_text(300, 300, text="クリックでスタート！", fill="navy", font=FNT)
        cvs.create_text(350, 450, text="ゴブレットゴブラーズ\n1.縦横斜め 三つ揃えたら勝ちです\n2.小さい物の上に大きい物をおけます\n3.盤面からも取って移動できます", fill="navy", font=MINI_FNT)
    cvs.update()

root = tkinter.Tk()
root.title("Gobblet Gobblers(ゴブレットゴブラーズ)")
root.resizable(False, False)
root.bind("<Button>", click)
root.geometry("1050x750")
cvs = tkinter.Canvas(width=1050, height=750, bg="ivory")
cvs.pack()
masume()
root.mainloop()