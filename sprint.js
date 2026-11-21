/* 35 天冲刺：每天三段（上午管综 / 下午英语二 / 晚上写作），和考场时间对齐 */
(function(){
"use strict";
var K=window.K199; if(!K) return;
var st=K.st; st.p35=st.p35||{};

// 按钮：[文字, 类型, 值]  类型 learn=去背公式卡 drill=真题练习 go=跳页 w=每日写作子页
var B={
  ds:["背：条件充分","learn","m-ds-rule,m-ds-trick"], d1:["练：第1天真题","drill","d1"], d2:["练：第2天真题","drill","d2"],
  d3:["练：第3天真题","drill","d3"], d4:["练：第4天真题","drill","d4"], mock:["计时模拟 10 题","drill","mock"],
  wrong:["重练错题","drill","wrong"], memo:["遮住公式自测","memo","1"], logic:["逻辑口诀","go","logic"],
  plan:["考场策略","go","plan"], essay:["审题立意 1 题","w","essay"], cards:["缺陷快认 10 张","w","cards"],
  cloze:["模板默写","w","cloze"], lz:["真题找缺陷","w","lz"], write:["写作模板","go","write"],
  l1:["背：应用题","learn","m-app"], l2:["背：概率数列","learn","m-prob,m-seq"], l3:["背：几何","learn","m-geo,m-solid"],
  l4:["背：代数解析","learn","m-alg,m-ana,m-int"], trick:["邪修技巧","learn","m-ps-trick,m-skip"]
};

// 一年真题的分项练习日
function yearDay(y,essay){return {
  t:y+" 年真题分项练",
  am:"逻辑 30 题，限时 55 分钟 → 数学只做“必做”题型，限时 60 分钟，其余按统计猜 → 对答案、订正错题（"+y+" 年卷）",
  pm:"英语二 "+y+" 年：阅读 2 篇（每篇限时 18 分钟）+ "+(y%2?"新题型":"翻译")+" 1 道 → 对答案，生词抄 10 个",
  ev:essay?"论说文：完整写 1 篇，限时 35 分钟（"+y+" 年题目），写完对照立意看有没有跑题":"论证有效性分析：完整写 1 篇，限时 25 分钟（"+y+" 年材料），找够 4 个缺陷",
  btn:{am:["logic","trick"],ev:essay?["essay"]:["lz","cards"]}};}
function mockDay(y){return {
  t:"整套模拟："+y+" 年",mock:1,
  am:"8:30 开始，3 小时一口气做完 "+y+" 年管综，顺序和考场一样：逻辑 55 分钟 → 写作 60 分钟 → 数学 60 分钟 → 最后 5 分钟按统计涂满",
  pm:"14:00 开始，3 小时做完 "+y+" 年英语二整卷（作文先写，完形最后、不会就猜）",
  ev:"只对答案、记分数，不订正。早点休息（订正放明天）",
  btn:{am:["plan"]}};}
function fixDay(y){return {
  t:"订正 "+y+" 年 + 补弱项",
  am:"订正昨天管综：每道错题写一句“错在哪”。数学错题看邪修解法，逻辑错题回到口诀",
  pm:"订正英语：阅读错题回原文找定位句；作文对照模板改一遍",
  ev:"挑分最低的一块（数学 / 逻辑 / 论证 / 论说），专练 1 小时",
  btn:{am:["wrong","logic"],ev:["cards","essay"]}};}
function restDay(t){return {
  t:t,rest:1,
  am:"数学：遮住公式自测一遍 → 重练错题",
  pm:"英语：大小作文模板各默写 1 遍 + 阅读 1 篇保持手感",
  ev:"半休：写一段本周复盘（哪类题最常错），然后休息。不要补课",
  btn:{am:["memo","wrong"],ev:["cloze"]}};}

var D=[
 {t:"数学：条件充分 + 应用题",am:"5 天背完·第 1 天：背条件充分 5 个选项意思和秒判技巧、应用题公式 → 练 8 道真题。剩下时间读一遍逻辑口诀",pm:"英语：小作文书信模板（建议 / 道歉 / 感谢）背熟 + 阅读真题 1 篇",ev:"审题立意 1 题 + 缺陷快认 10 张",btn:{am:["ds","l1","d1"],ev:["essay","cards"]}},
 {t:"数学：概率排列 + 数列",am:"5 天背完·第 2 天：背公式 → 练 8 道真题。逻辑：形式逻辑口诀默写一遍",pm:"英语：大作文图表模板（描述 → 原因 → 结论）背熟 + 阅读 1 篇",ev:"审题立意 1 题 + 缺陷快认 10 张",btn:{am:["l2","d2","logic"],ev:["essay","cards"]}},
 {t:"数学：几何",am:"5 天背完·第 3 天：背公式 → 练 7 道真题。逻辑：论证逻辑（削弱 / 加强 / 假设）读一遍",pm:"英语：小作文默写 1 遍 + 阅读 1 篇 + 新题型 1 道",ev:"论证有效性：模板默写",btn:{am:["l3","d3","logic"],ev:["cloze"]}},
 {t:"数学：代数 + 解析几何",am:"5 天背完·第 4 天：背公式 → 练 6 道真题。逻辑：综合推理（大题组）的方法读一遍",pm:"英语：大作文默写 1 遍 + 阅读 1 篇",ev:"审题立意 1 题 + 缺陷快认 10 张",btn:{am:["l4","d4","logic"],ev:["essay","cards"]}},
 {t:"第一次计时",am:"数学计时模拟 10 题（25 分钟）→ 逻辑真题 15 题，限时 30 分钟 → 订正",pm:"英语：阅读 2 篇，限时 36 分钟 → 订正",ev:"真题找缺陷 1 篇",btn:{am:["mock","trick"],ev:["lz"]}},
 {t:"第一次逻辑整卷",am:"逻辑 30 题，限时 55 分钟（2011 年卷）→ 订正：每道错题对应到口诀哪一条",pm:"英语：阅读 2 篇 + 翻译 1 道",ev:"论说文：只写提纲（标题 + 3 个分论点），限时 10 分钟，写 2 题",btn:{am:["logic"],ev:["essay","write"]}},
 restDay("第 1 周复盘（半休）"),
 yearDay(2012,0),yearDay(2013,1),yearDay(2014,0),restDay("复习日"),
 yearDay(2015,1),yearDay(2016,0),yearDay(2017,1),yearDay(2018,0),restDay("第 3 周复盘（半休）"),
 yearDay(2019,1),yearDay(2020,0),yearDay(2021,1),yearDay(2022,0),
 {t:"进入模拟前的准备",am:"重练所有数学错题 + 遮住公式自测；逻辑错题再做一遍",pm:"英语：作文模板默写 + 阅读 1 篇",ev:"把“3 小时怎么分”和盲猜统计读熟，明天开始整套模拟",btn:{am:["wrong","memo"],ev:["plan"]}},
 mockDay(2023),fixDay(2023),restDay("半休 + 错题"),mockDay(2024),fixDay(2024),mockDay(2025),fixDay(2025),
 mockDay(2026),fixDay(2026),
 {t:"回归：数学",am:"遮住公式自测 2 遍，只看必做题型；重练全部错题",pm:"英语：大小作文模板默写；阅读 1 篇保持手感",ev:"缺陷快认 10 张 + 模板默写",btn:{am:["memo","wrong"],ev:["cards","cloze"]}},
 {t:"回归：逻辑 + 写作",am:"逻辑口诀默写一遍；做 15 题保持手感（30 分钟）",pm:"英语：只看之前的作文和生词，不做新题",ev:"论说文：写 2 个提纲；论证有效性：模板默写",btn:{am:["logic"],ev:["essay","cloze"]}},
 {t:"回归：考场流程",am:"把考场策略、盲猜统计、保命动作读 3 遍，背下来",pm:"英语：作文模板读 2 遍",ev:"按考试时间作息：23:00 前睡，7:00 起",btn:{am:["plan"],ev:["write"]}},
 {t:"只看不练",am:"翻一遍公式卡和口诀，只看不做题",pm:"翻一遍作文模板",ev:"早睡。不刷新题，不对答案",btn:{am:["memo","logic"]}},
 {t:"考前一天",am:"准备物品：准考证、身份证、2B 铅笔、橡皮、黑色签字笔、手表（不能是智能手表）",pm:"去考场踩点，算好路上时间",ev:"把考场策略读一遍，21:30 上床",btn:{am:["plan"]}}
];

var START=new Date(2026,10,21), EXAM=new Date(2026,11,26), WK="日一二三四五六";
function dkey(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function nth(i){var d=new Date(START);d.setDate(d.getDate()+i);return d}
var todayD=new Date();todayD.setHours(0,0,0,0);
var ti=Math.round((todayD-START)/864e5);

function btns(list){return (list||[]).map(function(k){var b=B[k];if(!b)return "";
  if(b[1]==="learn")return '<button data-learn="'+b[2]+'">'+b[0]+'</button>';
  if(b[1]==="drill")return '<button data-drill="'+b[2]+'">'+b[0]+'</button>';
  if(b[1]==="memo")return '<button data-memo="1">'+b[0]+'</button>';
  if(b[1]==="w")return '<button data-t-go="daily" data-wsub="'+b[2]+'">'+b[0]+'</button>';
  return '<button data-t-go="'+b[2]+'">'+b[0]+'</button>';}).join("")}
function block(i,k,label,time,txt,bl){var on=!!(st.p35[i]&&st.p35[i][k]);
  return '<div class="blk'+(on?" ok":"")+'"><label class="chk"><input type="checkbox" data-p35="'+i+'" data-k="'+k+'"'+(on?" checked":"")+'><b>'+label+'</b><span class="small">'+time+'</span></label><p>'+txt+'</p>'+(bl&&bl.length?'<div class="acts">'+btns(bl)+'</div>':"")+'</div>'}
function done(i){var r=st.p35[i]||{};return (r.am?1:0)+(r.pm?1:0)+(r.ev?1:0)}

function render(){
  var box=document.getElementById("sprintbox"); if(!box)return;
  var left=Math.round((EXAM-todayD)/864e5), full=D.filter(function(x,i){return done(i)===3}).length;
  var h='<div class="note"><b>每天三段，和考场时间一样：</b>上午 8:30–11:30 管综，下午 14:00–16:30 英语二，晚上 1 小时写作。做完一段就勾一段。<br>'
   +'<b>状态差的一天：</b>只做上午的第一项 + 英语阅读 1 篇（约 2 小时），也算没断。<br>'
   +'<b>落下了：</b>不用补。直接做今天那一张，计划是按日期走的。</div>'
   +'<div class="row35"><span>'+(left>0?"离考试 <b>"+left+"</b> 天":left===0?"<b>今天考试，加油！</b>":"考试已结束")+'</span><span class="small">整天做完 '+full+' / '+D.length+' 天</span>'
   +(ti>=0&&ti<D.length?'<button class="wbtn pri" id="go35">跳到今天</button>':"")+'</div>';
  var wk=-1;
  D.forEach(function(x,i){
    var d=nth(i),w=Math.floor(i/7);
    if(w!==wk){wk=w;h+='<h2>'+["第 1 周：背熟 + 小练","第 2 周：真题分项练","第 3 周：真题分项练","第 4 周：整套模拟","第 5 周：最后模拟 + 回归"][w]+'</h2>'}
    var n=done(i),cls=i===ti?" today":(i<ti?" past":"");
    h+='<div class="card day35'+cls+(n===3?" done":"")+'" id="p35-'+i+'"><div class="row"><h3><span class="dt">'+(d.getMonth()+1)+"/"+d.getDate()+" 周"+WK[d.getDay()]+'</span>'+x.t
      +(x.mock?' <span class="tag t-must">整套</span>':"")+(x.rest?' <span class="tag t-skip">半休</span>':"")+(i===ti?' <span class="tag t-do">今天</span>':"")+'</h3><span class="small">'+n+'/3</span></div>'
      +block(i,"am","上午 · 管综","8:30–11:30",x.am,x.btn&&x.btn.am)
      +block(i,"pm","下午 · 英语二","14:00–16:30",x.pm,x.btn&&x.btn.pm)
      +block(i,"ev","晚上 · 写作 / 复盘","1 小时",x.ev,x.btn&&x.btn.ev)+'</div>';
  });
  var e=EXAM;
  h+='<div class="card day35 exam"><h3><span class="dt">12/26 周'+WK[e.getDay()]+'</span>考试</h3><p>上午 8:30–11:30 管综：逻辑 → 写作 → 数学，最后 5 分钟涂满。下午 14:00–17:00 英语二。中午吃饭、闭眼休息，不对答案。</p></div>';
  box.innerHTML=h;
}
document.addEventListener("change",function(e){var c=e.target;if(!c.dataset||c.dataset.p35===undefined)return;
  var i=+c.dataset.p35;st.p35[i]=st.p35[i]||{};st.p35[i][c.dataset.k]=c.checked;K.save();
  var y=window.pageYOffset;render();window.scrollTo(0,y);});
document.addEventListener("click",function(e){if(e.target.id==="go35")jump()});
function jump(){var el=document.getElementById("p35-"+ti);if(el)window.scrollTo(0,el.getBoundingClientRect().top+window.pageYOffset-110)}
render();
window.K199S={days:D.length,jump:jump};
if(document.getElementById("sprint").classList.contains("show"))setTimeout(jump,50);
})();
