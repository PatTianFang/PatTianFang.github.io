const photoStories = [
    {
        title: "床沿上的早晨",
        text: "毕业季的宿舍总有一种半醒的状态：东西还没完全收好，人也还没准备好离开。坐在床边的一刻，像是在确认自己真的走到这里了。",
        tag: "宿舍"
    },
    {
        title: "楼前的正式合影",
        text: "站在熟悉的楼前，姿势比平时认真一点，表情也比平时收敛一点。照片里是几个人，背后其实是很多次一起上课、吃饭和赶路。",
        tag: "毕业"
    },
    {
        title: "再站近一点",
        text: "同一处台阶，同一群人，距离稍微变近，画面就多了一点默契。毕业照的意义不在于多完美，而在于那天大家真的都在。",
        tag: "合影"
    },
    {
        title: "风从树洞里穿过",
        text: "校园和旅途里最容易被记住的，常常是这样的小场景。人只是从树影下经过，夏天却把这一秒留得很长。",
        tag: "路上"
    },
    {
        title: "城市忽然很亮",
        text: "抬头看到高楼、蓝天和刺眼的光，会突然意识到这些日子并不只属于学校。毕业前的城市，也在替我们把下一程打开。",
        tag: "城市"
    },
    {
        title: "人群里的古城",
        text: "景点很热闹，人也很多，但回忆会自动把背景虚化，只留下同行的人、那天的天气，以及走了很久还不觉得累的心情。",
        tag: "旅行"
    },
    {
        title: "镜子里的自己",
        text: "不是每张照片都要正式。偶尔对着镜子随手拍下来的样子，反而把当时的身体状态、情绪和年轻气都保存得很直接。",
        tag: "日常"
    },
    {
        title: "站上灯光",
        text: "有些瞬间像临时舞台，可能只是一次活动、一次上台、一次被朋友拍到。毕业之后再看，会发现那些小紧张也很珍贵。",
        tag: "舞台"
    },
    {
        title: "夜色和游乐场",
        text: "晚上适合把话说慢一点。身后的灯光、脸上的疲惫和靠近镜头的朋友，都让这张照片像一段没有结尾的聊天。",
        tag: "夜晚"
    },
    {
        title: "笑到低头",
        text: "真正放松的时候，不需要看镜头。一个低头的笑，比很多精心摆好的姿势更能说明那天发生过什么。",
        tag: "朋友"
    },
    {
        title: "香火和石阶",
        text: "在古老建筑前停一下，时间会变得不一样。四年的快和一座城的慢放在一起，心里也会安静一点。",
        tag: "停留"
    },
    {
        title: "海边并肩",
        text: "海风会把毕业的情绪吹散一些。站在水边合影时，好像离开不再只是告别，也像是去更远地方的开始。",
        tag: "海边"
    },
    {
        title: "宿舍桌前",
        text: "日常最容易消失，也最值得留下。椅子、拖鞋、桌面和还没结束的一天，组成了毕业前最真实的背景。",
        tag: "寝室"
    },
    {
        title: "热闹街头",
        text: "朋友一起挤进镜头，身后是人声和店招。这样的照片不会解释路线，却能把一路上的热闹都带回来。",
        tag: "街头"
    },
    {
        title: "饭桌上的一晚",
        text: "很多重要的话，最后都落在饭桌上。菜还热着，人还坐着，离别就被暂时推迟到下一次举杯之后。",
        tag: "聚餐"
    },
    {
        title: "校门前的光",
        text: "站在校名旁边，终于把自己和这几年放进同一张照片。夕阳照过来的时候，告别也显得没有那么突然。",
        tag: "校园"
    },
    {
        title: "电梯里的同行",
        text: "生活里的很多合影发生在最普通的地方。电梯门、镜子和两个人的肩膀，反而让这张照片有很亲近的温度。",
        tag: "同行"
    },
    {
        title: "桥上的合照",
        text: "旅途中遇到的卡通人物、桥和风景，都变成了笑的理由。毕业前的出门，像是在给四年补上一段轻快的尾声。",
        tag: "出游"
    },
    {
        title: "屏幕里的路线",
        text: "电脑屏幕也能成为回忆的一部分。它记录了某段行程、某个游戏或某次并排坐着的晚上，安静但具体。",
        tag: "屏幕"
    },
    {
        title: "灯光下的并排",
        text: "寝室或网吧的光照在脸上，时间就变得很晚。那些一起熬过的夜，后来都会变成很难复刻的陪伴。",
        tag: "深夜"
    },
    {
        title: "一个表情",
        text: "表情包式的截图也是毕业相册的一部分。它不负责好看，只负责把那种只有熟人才懂的玩笑留住。",
        tag: "玩笑"
    },
    {
        title: "被定格的神态",
        text: "有些照片像意外截取的表情，却很像某个阶段的真实状态。不是每一帧都完美，但每一帧都属于那时。",
        tag: "瞬间"
    },
    {
        title: "彩色背景里的梗",
        text: "大学里总会留下几张无法严肃解释的图。它们可能没有标准叙事，却能在多年后快速把人带回同一个笑点。",
        tag: "梗图"
    },
    {
        title: "手机里的歌",
        text: "截图保存了某首歌、某段文字和某个当下的心情。毕业回忆不只有照片，也有那些被单曲循环过的时刻。",
        tag: "音乐"
    },
    {
        title: "夜路上的队伍",
        text: "一群人走在夜里，背影比正脸更像告别。路灯、车流和慢慢向前的人，把散场写得很轻。",
        tag: "夜路"
    },
    {
        title: "最后一觉",
        text: "被子、床铺和还没起身的人，是这组照片里最安静的一张。毕业之后，连赖床都变成了具体的怀念。",
        tag: "尾声"
    },
    {
        title: "一张旧报纸",
        text: "报纸上的画面像是把一次出发写成了正式记录。后来再看，它不只是背景材料，也像给这段旅程盖了一个时间戳。",
        tag: "记录"
    },
    {
        title: "车厢里的合影",
        text: "几个人挤在一起看向镜头，空间不大，气氛却很满。旅途真正开始之前，同行这件事已经先被照片确认了。",
        tag: "出发"
    },
    {
        title: "窗边的落日",
        text: "太阳贴着城市慢慢落下，玻璃把人和远处的楼都映在一起。那一刻不需要说太多，只要坐着看天色变暗。",
        tag: "黄昏"
    },
    {
        title: "高楼下面",
        text: "站在高楼和广场之间，人会显得很小，但心情反而开阔。毕业前的出门，总有一种向更大世界试探的感觉。",
        tag: "城市"
    },
    {
        title: "古城前的笑",
        text: "景点、人群和风一起挤进镜头，大家的表情比建筑更抢眼。所谓旅行，很多时候就是换个地方继续一起笑。",
        tag: "同行"
    },
    {
        title: "扶手边的片刻",
        text: "照片只截住了一个身体局部，却能让人想起当时的环境：站着、等着、说着话，日常从来不是完整才值得保存。",
        tag: "片刻"
    },
    {
        title: "海边的红衣",
        text: "坐在海边栏杆旁，身后是开阔的水面和天空。离校之前看到海，好像能把心里拥挤的部分都放远一点。",
        tag: "海边"
    },
    {
        title: "傍晚并肩",
        text: "天色压下来，海边的风把画面吹得很柔和。两个人站在一起，像是在给一段路留一个安静的句号。",
        tag: "并肩"
    },
    {
        title: "树和江岸",
        text: "城市天际线在远处，近处的人看起来很放松。这样的照片会提醒人，毕业季也有很多不用赶路的下午。",
        tag: "江边"
    },
    {
        title: "贴满电极的瞬间",
        text: "有些回忆带着一点实验感和荒诞感。认真参与、被朋友记录下来，后来就成了大家都会笑着翻到的一页。",
        tag: "实验"
    },
    {
        title: "寝室里的大合照",
        text: "宿舍把人装得很近，镜头也装得很满。毕业前这样的拥挤很珍贵，因为每个人都还在同一个生活半径里。",
        tag: "宿舍"
    },
    {
        title: "白衣服的自拍",
        text: "靠得很近的一张自拍，没什么正式感，却很像真实相处的距离。朋友之间的快乐常常就是这样突然出现。",
        tag: "自拍"
    },
    {
        title: "挤进镜头",
        text: "脸贴近镜头的时候，照片就不再追求构图。它只负责把那种当下的热闹和亲近感完整留下。",
        tag: "朋友"
    },
    {
        title: "走廊里的队伍",
        text: "一群人站在走廊里，像是刚结束什么，又准备去下一处。毕业季就是由很多这样的中转时刻组成的。",
        tag: "走廊"
    },
    {
        title: "累到睡着",
        text: "头一歪就睡过去的样子，比很多笑脸更说明那天过得很满。疲惫也是回忆的一部分，而且很真实。",
        tag: "疲惫"
    },
    {
        title: "舞台上的一晚",
        text: "灯光、背景板和并排站着的人，把那一晚变得正式。不是每天都有掌声，所以这一刻值得被单独留下。",
        tag: "舞台"
    },
    {
        title: "车窗边看外面",
        text: "坐在车里看向窗外，像是在旅途和日常之间短暂停靠。很多想法都会在这种移动的安静里冒出来。",
        tag: "车上"
    },
    {
        title: "海边标牌旁",
        text: "人坐在标牌旁，海在身后。地点被文字写明，心情却只能从姿势和阳光里慢慢读出来。",
        tag: "打卡"
    },
    {
        title: "屏幕里的侧脸",
        text: "截图把人和当时的画面一起保存下来。它不像照片那么清晰，却很像朋友之间互相记录的方式。",
        tag: "截图"
    },
    {
        title: "黑白车里",
        text: "黑白滤镜让车里的自拍多了一点电影感。普通的一段路，因为被拍下来，就变得有了回看的理由。",
        tag: "路上"
    },
    {
        title: "楼下的人影",
        text: "站在楼下，身边是墙、窗和阳光。大学里的很多地点并不特别，但只要人出现过，就会变成坐标。",
        tag: "校园"
    },
    {
        title: "景区前的停留",
        text: "在人多的地方单独站一会儿，像是给自己留了一个正式到此一游。多年后看，背景和人都在说那天很热闹。",
        tag: "游览"
    },
    {
        title: "桌边的安静",
        text: "坐在小桌前，戴着耳机处理自己的事。毕业回忆不全是喧闹，也有这种各自安静待着的时刻。",
        tag: "日常"
    },
    {
        title: "被子里的早晨",
        text: "酒店或宿舍的床铺总能留下最松弛的画面。不是每一次出行都要精神饱满，赖着不动也很真实。",
        tag: "休息"
    },
    {
        title: "车上的两个人",
        text: "坐车时拍下的自拍，有一点晃，也有一点随意。它记录的不是目的地，而是一起在路上的状态。",
        tag: "同行"
    },
    {
        title: "画像下的片刻",
        text: "室内的陈设和墙上的画像让画面突然有了年代感。人在其中一坐，回忆就多了一点奇妙的反差。",
        tag: "室内"
    },
    {
        title: "车窗后面",
        text: "隔着车窗看见人，像是从一段路程里截下来的小插曲。不是特别清楚，却正因为如此更像旅途。",
        tag: "车窗"
    },
    {
        title: "欢迎来到天津",
        text: "报纸式的画面把城市和人放在一起，带着一点玩笑，也带着一点仪式感。到达某地，总要留下证据。",
        tag: "天津"
    },
    {
        title: "握手的瞬间",
        text: "一张看起来很正式的握手照，放在回忆里反而有点可爱。大学里的郑重其事，后来都会变成笑点和谈资。",
        tag: "仪式"
    },
    {
        title: "堆叠的人像",
        text: "前后站成一条线，大家都试图挤进画面。这样的照片不讲究，只讲究谁也别被漏掉。",
        tag: "合影"
    },
    {
        title: "楼梯上的停顿",
        text: "楼梯让人天然处在上下之间。坐在台阶上拍一张，像是把继续往前之前的短暂停顿保存下来。",
        tag: "楼梯"
    },
    {
        title: "房间里的晚上",
        text: "桌子、床和朋友分散在房间里，各自坐着，却仍然共享同一个晚上。放松的空间会让回忆变得很软。",
        tag: "房间"
    },
    {
        title: "摩托旁边",
        text: "展厅里的车和站在旁边的人，让画面突然有了速度感。哪怕只是看一看，也算给当天加了一点兴奋。",
        tag: "展厅"
    },
    {
        title: "再看一眼车",
        text: "同一辆车换个角度再拍一张，说明当时确实喜欢。回忆里允许重复，因为喜欢本来就会让人多停一会儿。",
        tag: "兴趣"
    },
    {
        title: "三个人的自拍",
        text: "镜头举高一点，三个人就都进来了。脸离得近，背景退到后面，朋友关系反而显得更清楚。",
        tag: "自拍"
    },
    {
        title: "车厢里的阅读",
        text: "最后一张像是回程，也像是某段路上的安静收尾。有人低头看手机，窗外继续往后退，故事就慢慢合上。",
        tag: "回程"
    },
    {
        title: "阳光下的发言",
        text: "站在门前拿着话筒，阳光把这一刻照得很清楚。那些需要开口表达的瞬间，也是大学里很正式的一部分。",
        tag: "发言"
    },
    {
        title: "再说一遍",
        text: "同一个场景换个角度，神情更专注。被镜头留下的不只是发言本身，还有那天站上去之前的准备和认真。",
        tag: "现场"
    },
    {
        title: "海边剪影",
        text: "落日把人变成一个黑色的轮廓，动作反而更自由。这样的照片很轻，却能把海风和傍晚一起带回来。",
        tag: "剪影"
    },
    {
        title: "街边的集体照",
        text: "车、建筑、树和朋友都挤在一张图里，像是旅行路上的标准停靠点。真正重要的是大家都在镜头前。",
        tag: "合影"
    },
    {
        title: "天津的路牌",
        text: "路牌把地点写得很明确，人把心情补完整。到一个城市玩，最有意思的经常是这些带点玩笑的打卡。",
        tag: "天津"
    },
    {
        title: "夜景前坐一会",
        text: "身后是亮起来的城市，脚下是透明的高处。夜晚会让旅行慢下来，也会让人更愿意把话说久一点。",
        tag: "夜景"
    },
    {
        title: "球衣和走廊",
        text: "穿着球衣走在商场里，像是把兴趣直接穿到了身上。照片不需要解释热爱，看到这一身就够了。",
        tag: "兴趣"
    },
    {
        title: "认真吃一口",
        text: "饭桌前低头吃东西，是旅行里最稳定的幸福。走了很多路以后，一口热的东西就能把人重新拉回来。",
        tag: "吃饭"
    },
    {
        title: "蓝色小车",
        text: "骑在小车上的样子有点轻松，也有点好笑。大学回忆里需要这种不端着的画面，越随意越耐看。",
        tag: "玩笑"
    },
    {
        title: "手里的小黄鸭",
        text: "拿着小玩具看镜头，画面突然变得很柔软。旅途中买到或拿到的小东西，后来都会变成具体的提示物。",
        tag: "小物"
    },
    {
        title: "海边三格",
        text: "同一个人、同一片海，被拆成三段情绪。风、浪和侧脸组合在一起，像是给海边留了一组慢镜头。",
        tag: "海边"
    },
    {
        title: "街口的笑脸",
        text: "店门口的自拍把夜晚拍得很亮。朋友在旁边探进镜头，照片就有了那种临时发生的快乐。",
        tag: "街口"
    },
    {
        title: "长椅上的靠近",
        text: "两个人在长椅上靠得很近，城市的光在后面。毕业季里这种互相依靠的瞬间，比正式合影更像生活。",
        tag: "靠近"
    },
    {
        title: "举杯的晚上",
        text: "酒杯和笑脸一起抬起来，夜里的疲惫就被暂时放到旁边。聚在一起的晚上，总值得多拍几张。",
        tag: "夜晚"
    },
    {
        title: "热闹的一桌",
        text: "一桌人、一桌菜和屏幕上的颜色，组成很典型的聚会现场。这样的照片一看就能听见当时的声音。",
        tag: "聚餐"
    },
    {
        title: "雕塑前的夜色",
        text: "夜晚的雕塑很安静，人站在前面反而显得精神。旅行里的城市符号，最后都会和某个人的表情绑在一起。",
        tag: "地标"
    },
    {
        title: "和雕塑合影",
        text: "胸前的红色和背后的雕塑形成很鲜明的画面。认真站好的一秒，也能带着一点不经意的幽默。",
        tag: "留影"
    },
    {
        title: "夜宵小店",
        text: "店里的灯、菜单和桌上的碗，让这张照片特别有烟火气。旅行走到最后，往往会落在一顿夜宵里。",
        tag: "夜宵"
    },
    {
        title: "夜里的拥抱",
        text: "光线不强，画面有点糊，但情绪很直接。不是所有重要照片都清晰，有些只要把当时的靠近留下就够了。",
        tag: "拥抱"
    },
    {
        title: "证书和雕塑",
        text: "手里拿着东西站在雕塑前，像是给这一段经历做了个小小总结。仪式感有时就是这样被拍出来的。",
        tag: "仪式"
    },
    {
        title: "花枝后面",
        text: "春天的枝条挡在镜头前，人站在后面看向远处。毕业前的校园和城市，都在这种光里显得温和。",
        tag: "春天"
    },
    {
        title: "台球桌旁",
        text: "俯身瞄准的一刻，会让人想起那些不用赶时间的晚上。朋友在一旁，球桌在眼前，时间就慢下来。",
        tag: "台球"
    },
    {
        title: "教堂前合照",
        text: "灰色天空下的建筑很庄重，两个人站在前面，画面就有了旅行的纪念感。天气不好也不影响记住那天。",
        tag: "建筑"
    },
    {
        title: "广场上的自拍",
        text: "雕像、广场和两个人一起进入镜头，地点被压缩到一张自拍里。照片轻便，记忆却很完整。",
        tag: "广场"
    },
    {
        title: "桌边闲坐",
        text: "围着桌子坐下来的时刻，总能让行程暂时停住。不是每张照片都要热闹，能坐一会儿也很好。",
        tag: "休息"
    },
    {
        title: "车站里的出发",
        text: "斜着举起镜头，把一群人和站台都收进画面。车站天然带着离开和抵达的意味，很适合放进毕业回忆。",
        tag: "车站"
    },
    {
        title: "窗边低头",
        text: "坐在窗边看手机，外面的风景不断后退。回程或出发的路上，人总会短暂安静下来。",
        tag: "途中"
    },
    {
        title: "树荫下的等待",
        text: "几个人坐在树荫里，身边是包和饮料。赶路之间的等待并不空白，它也是同行的一部分。",
        tag: "等待"
    },
    {
        title: "路牌旁边",
        text: "路牌、城市和一个人的自拍，把地点交代得很清楚。到过哪里，有时就靠这样一张简单照片确认。",
        tag: "路牌"
    },

    {
        title: "铜像旁边的笑",
        text: "坐在铜像旁边的样子带着一点玩笑，也带着旅行里最自然的松弛。景点不只是背景，朋友在旁边时它才真的变成回忆。",
        tag: "留影"
    },
    {
        title: "被放大的表情",
        text: "一张近到有点夸张的脸，也能成为相册里最有辨识度的一页。大学里的快乐很多时候就是这样不讲究，但一眼就能笑出来。",
        tag: "玩笑"
    },
    {
        title: "林子里的蓝色朋友",
        text: "阳光从树林里穿过，旁边站着童话一样的雕塑。旅行中遇到这些轻松的画面，会把毕业季的沉重感悄悄冲淡。",
        tag: "出游"
    },
    {
        title: "低头的夜色",
        text: "夜里坐在地上低头的一瞬间，像是行程中突然按下暂停。热闹之外也会有这种安静片段，后来回看反而很真实。",
        tag: "夜晚"
    },
    {
        title: "街头的大眼镜",
        text: "夸张的眼镜、街边的车流和探进来的朋友，让画面一下子有了喜剧感。毕业相册需要这种不端着的快乐。",
        tag: "街头"
    },
    {
        title: "镜头贴近脸",
        text: "近距离自拍会把表情放得很大，也把当时的熟悉感放得很近。只有关系足够松弛，才会留下这种照片。",
        tag: "自拍"
    },
    {
        title: "夜游的圆环",
        text: "夜色里站在发亮的装置前，整个人都被游乐场的气氛包住。晚上的风景会让同行的人看起来更像一场小冒险。",
        tag: "夜游"
    },
    {
        title: "天坛前的自拍",
        text: "熟悉的地标出现在身后，镜头里的表情反而很日常。旅行的纪念感不一定要严肃，轻轻一拍也能把地点记牢。",
        tag: "北京"
    },
    {
        title: "石窟前的站定",
        text: "岩壁、栏杆和墨镜把画面压得很硬朗，人站在中间像给这次出行留了一个正式坐标。到过的地方，就这样被存进相册。",
        tag: "景点"
    },
    {
        title: "楼梯上的装备",
        text: "背着包站在楼梯上，像刚从某个活动现场下来。大学回忆里总有一些说不清来龙去脉的装扮，越具体越好笑。",
        tag: "现场"
    },
    {
        title: "雕像前抱臂",
        text: "站在雕像前摆出认真姿势，表情和背景形成一种微妙的反差。旅行照最耐看的地方，常常就是这点不经意。",
        tag: "留影"
    },
    {
        title: "宠物派对门口",
        text: "彩色背景和怀里的小朋友让画面一下子轻了起来。毕业季也不全是告别，还有很多突然遇见的可爱时刻。",
        tag: "可爱"
    },
    {
        title: "窗边的夕阳",
        text: "高处的玻璃外是慢慢落下去的太阳，脸上的光也变得柔和。旅行中这样的黄昏，会把一天收得很安静。",
        tag: "黄昏"
    },
    {
        title: "海岸边的站立",
        text: "人站在岩石和海水之间，画面被留得很开阔。毕业前看到海，总像是在提醒自己下一段路也可以很远。",
        tag: "海边"
    },
    {
        title: "天津路牌下",
        text: "路牌把地点写得直接，人站在下面就像给旅程盖章。城市名字出现在照片里，很多年后也不会忘记那一站。",
        tag: "天津"
    },
    {
        title: "广场的天光",
        text: "广场、纪念柱和很蓝的天空一起出现，照片有一种清清楚楚的到达感。人在画面里很小，心情却被放大了。",
        tag: "广场"
    },
    {
        title: "楼前的大合影",
        text: "一群人站在楼前排成几层，画面规整又热闹。毕业前的集体照最重要的不是姿势，而是谁都没有缺席。",
        tag: "合影"
    },
    {
        title: "山间三个人",
        text: "山风、灰天和三个靠近镜头的人，把旅途里的冷和热闹放在一起。人多一点，路上的疲惫也会轻一点。",
        tag: "同行"
    },
    {
        title: "夜市里的三张脸",
        text: "夜晚的街边灯光很杂，三个人挤进镜头却很清楚。这样的自拍不需要背景完整，笑脸就是那天的重点。",
        tag: "夜市"
    },
    {
        title: "古楼前挥手",
        text: "身后的建筑和伸出的手一起进了画面，像是在给那一天打招呼。旅行照里最生动的，往往是这种随手动作。",
        tag: "旅行"
    },
    {
        title: "泳池边的并排",
        text: "几个人站在泳池边，水光和笑容都很亮。毕业季的回忆不只在校园，也在这些一起消耗体力的下午。",
        tag: "泳池"
    },
    {
        title: "贴脸的自拍",
        text: "两张脸几乎挤满画面，背景已经不重要了。朋友之间最直接的亲近感，经常就藏在这种贴得很近的自拍里。",
        tag: "朋友"
    },
    {
        title: "计时牌前的跳起",
        text: "跳起来的动作被定在计时牌前，像是一次小小的胜利。大学里那些认真玩过的项目，后来都会变成很亮的片段。",
        tag: "运动"
    },
    {
        title: "树荫下的三人",
        text: "阳光被叶子筛下来，三个人靠在一起看镜头。赶路之间找个阴影停一会儿，也是旅行里很舒服的部分。",
        tag: "树荫"
    },
    {
        title: "肩并肩走过",
        text: "两个人从树影和台阶旁走过，镜头像是顺手追上了一秒。不是所有照片都要正面站好，经过本身也值得留下。",
        tag: "同行"
    },
    {
        title: "球衣里的笑",
        text: "穿着球衣站在一起，笑得很直接。兴趣、运动和朋友混在一起的时候，照片会有一种很自然的年轻气。",
        tag: "球衣"
    },
    {
        title: "一顿热饭",
        text: "桌上的菜还热着，三个人坐在一起看镜头。走过很多地方以后，真正能把人留住的常常是一顿饭。",
        tag: "聚餐"
    },
    {
        title: "白光里的合照",
        text: "强烈的光把画面照得有点发白，却也让那一刻像被单独拎出来。照片不完美，回忆反而更有现场感。",
        tag: "合照"
    },
    {
        title: "海边的大队伍",
        text: "一群人在海边排开，水面和天空在背后铺得很宽。能把这么多人聚到同一张照片里，本身就已经很难得。",
        tag: "海边"
    },
    {
        title: "手机里的记录",
        text: "截图记录了时间、地点和坐在一起的人。不是所有回忆都来自相机，有时手机界面本身也会成为那天的证据。",
        tag: "记录"
    },
    {
        title: "车里的返程",
        text: "坐在车里戴着墨镜，旁边的人已经进入赶路状态。旅途快结束时，疲惫和满足常常会一起出现在脸上。",
        tag: "返程"
    },
    {
        title: "导航里的路",
        text: "车窗、导航和副驾的侧脸把回程拍得很具体。路上的时间也属于毕业回忆，只是它通常更安静。",
        tag: "路上"
    },
    {
        title: "房间里的点赞",
        text: "两个人坐在房间里对镜头竖起拇指，像是给这段旅程做一个简单确认。轻松的收尾也可以很正式。",
        tag: "收尾"
    },
    {
        title: "壁画前的摩托",
        text: "壁画、摩托和并肩站着的人让画面有一点电影感。旅行末尾遇到这样的背景，总会忍不住多拍一张。",
        tag: "街景"
    },
    {
        title: "再拍一张壁画",
        text: "同一处壁画再留一张，说明这面墙确实被大家喜欢。回忆里可以有重复，因为重复代表当时真的舍不得走开。",
        tag: "街景"
    }
];

const photos = photoStories.map((story, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
        number,
        thumb: `assets/webp/thumbs/photo-${number}.webp`,
        large: `assets/webp/large/photo-${number}.webp`,
        fallback: `assets/images/photo-${number}.jpg`,
        alt: `${story.title}，大学毕业回忆照片 ${index + 1}`,
        caption: `${story.title} · ${story.tag}`,
        ...story
    };
});

const gallery = document.querySelector("#photoGallery");
const memoryList = document.querySelector("#memoryList");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
let activeIndex = 0;
let galleryBuilt = false;
let memoryListBuilt = false;

function buildGallery() {
    if (galleryBuilt) return;
    galleryBuilt = true;

    const fragment = document.createDocumentFragment();

    photos.forEach((photo, index) => {
        const button = document.createElement("button");
        button.className = "photo-tile reveal";
        button.type = "button";
        button.dataset.index = String(index);

        const image = document.createElement("img");
        image.src = photo.thumb;
        image.alt = photo.alt;
        image.loading = "lazy";
        image.decoding = "async";
        image.fetchPriority = "low";

        const meta = document.createElement("span");
        meta.className = "photo-tile-meta";
        meta.textContent = photo.title;

        button.appendChild(image);
        button.appendChild(meta);
        fragment.appendChild(button);
    });

    gallery.appendChild(fragment);
    initReveal(gallery);
}

function buildMemoryList() {
    if (memoryListBuilt) return;
    memoryListBuilt = true;

    const fragment = document.createDocumentFragment();

    photos.forEach((photo, index) => {
        const article = document.createElement("article");
        article.className = `memory-card reveal ${index % 2 === 0 ? "memory-left" : "memory-right"}`;

        const imageWrap = document.createElement("button");
        imageWrap.className = "memory-image";
        imageWrap.type = "button";
        imageWrap.dataset.index = String(index);
        imageWrap.setAttribute("aria-label", `打开照片：${photo.title}`);

        const image = document.createElement("img");
        image.className = "memory-photo";
        image.src = photo.thumb;
        image.dataset.large = photo.large;
        image.dataset.fallback = photo.fallback;
        image.alt = photo.alt;
        image.loading = "lazy";
        image.decoding = "async";
        image.fetchPriority = "low";

        imageWrap.appendChild(image);

        const copy = document.createElement("div");
        copy.className = "memory-copy";

        const number = document.createElement("p");
        number.className = "memory-number";
        number.textContent = photo.number;

        const title = document.createElement("h3");
        title.textContent = photo.title;

        const text = document.createElement("p");
        text.textContent = photo.text;

        const tag = document.createElement("span");
        tag.className = "memory-tag";
        tag.textContent = photo.tag;

        copy.appendChild(number);
        copy.appendChild(title);
        copy.appendChild(text);
        copy.appendChild(tag);

        article.appendChild(imageWrap);
        article.appendChild(copy);
        fragment.appendChild(article);
    });

    memoryList.appendChild(fragment);
    initReveal(memoryList);
    initMemoryImageLoading();
}

function openLightbox(index) {
    activeIndex = (index + photos.length) % photos.length;
    const photo = photos[activeIndex];
    lightboxImage.src = photo.large;
    lightboxImage.alt = photo.alt;
    lightboxImage.onerror = () => {
        lightboxImage.onerror = null;
        lightboxImage.src = photo.fallback;
    };
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function showNextPhoto(step) {
    openLightbox(activeIndex + step);
}

function initReveal(root = document) {
    const targets = root.querySelectorAll(".reveal:not(.is-observed)");

    if (!("IntersectionObserver" in window)) {
        targets.forEach((target) => target.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                entry.target.classList.remove("is-observed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    });

    targets.forEach((target) => {
        target.classList.add("is-observed");
        observer.observe(target);
    });
}

function upgradeMemoryImage(image) {
    if (image.dataset.loaded === "true") return;
    image.dataset.loaded = "true";

    const highRes = new Image();
    highRes.decoding = "async";
    highRes.onload = () => {
        image.src = image.dataset.large;
        image.classList.add("is-loaded");
    };
    highRes.onerror = () => {
        image.src = image.dataset.fallback;
        image.classList.add("is-loaded");
    };
    highRes.src = image.dataset.large;
}

function initMemoryImageLoading() {
    const images = document.querySelectorAll(".memory-photo[data-large]:not([data-watch])");

    if (!("IntersectionObserver" in window)) {
        images.forEach(upgradeMemoryImage);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            upgradeMemoryImage(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: "700px 0px",
        threshold: 0.01
    });

    images.forEach((image) => {
        image.dataset.watch = "true";
        observer.observe(image);
    });
}

function initDeferredSections() {
    const shouldBuildImmediately = ["#gallery", "#moments"].includes(window.location.hash);

    if (shouldBuildImmediately || !("IntersectionObserver" in window)) {
        buildGallery();
        buildMemoryList();
        return;
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            if (entry.target.id === "gallery") {
                buildGallery();
            }

            if (entry.target.id === "moments") {
                buildMemoryList();
            }

            sectionObserver.unobserve(entry.target);
        });
    }, {
        rootMargin: "1100px 0px",
        threshold: 0.01
    });

    sectionObserver.observe(document.querySelector("#gallery"));
    sectionObserver.observe(document.querySelector("#moments"));
}

initDeferredSections();
initReveal();

gallery.addEventListener("click", (event) => {
    const tile = event.target.closest(".photo-tile");
    if (!tile) return;
    openLightbox(Number(tile.dataset.index));
});

memoryList.addEventListener("click", (event) => {
    const image = event.target.closest(".memory-image");
    if (!image) return;
    openLightbox(Number(image.dataset.index));
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => showNextPhoto(-1));
nextButton.addEventListener("click", () => showNextPhoto(1));

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showNextPhoto(-1);
    }

    if (event.key === "ArrowRight") {
        showNextPhoto(1);
    }
});
