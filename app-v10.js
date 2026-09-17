(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s);const $$=(s,p=document)=>[...p.querySelectorAll(s)];const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;const finePointer=matchMedia('(pointer: fine)').matches;const lowPower=!!(navigator.connection?.saveData||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)||(navigator.deviceMemory&&navigator.deviceMemory<=4));
const STORE={lang:'ecoArcadeV10Language',motion:'ecoArcadeV10MotionOff',name:'ecoArcadeV10Name',scores:'ecoArcadeV10Scores',refs:'ecoArcadeV10Reflections',achievements:'ecoArcadeV10Achievements',towerBest:'ecoArcadeV10TowerBest'};
const LEGACY={lang:'ecoArcadeV9Language',motion:'ecoArcadeV9MotionOff',name:'ecoArcadeV9Name',scores:'ecoArcadeV9Scores',refs:'ecoArcadeV9Reflections',achievements:'ecoArcadeV9Achievements',towerBest:'ecoArcadeV9TowerBest'};for(const k of Object.keys(STORE)){try{if(localStorage.getItem(STORE[k])===null&&localStorage.getItem(LEGACY[k])!==null)localStorage.setItem(STORE[k],localStorage.getItem(LEGACY[k]))}catch{}}
const storage={get(k,f){try{const v=JSON.parse(localStorage.getItem(k));return v??f}catch{return f}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}},remove(k){try{localStorage.removeItem(k)}catch{}}};
let lang=storage.get(STORE.lang,'ms')==='en'?'en':'ms';
// Animation modes: 0 = Full (bypasses reduceMotion), 1 = Toned (subdued), 2 = Off (static)
let animationMode=storage.get('ecoArcadeV10AnimMode', reduceMotion ? 1 : 0);
let motionOff=(animationMode===2);
/* ============ English dictionary (V10) ============
   Malay is the source language stored in the HTML; this dict is the EN mirror.
   Every data-i18n key used in index.html must exist here.                */
const EN={skip:'Skip to content',loginTitle:'Please Log In',loginSub:'Enter your username and password to access the platform.',loginUserLabel:'Username',loginPassLabel:'Password',loginError:'Invalid username or password. Please try again.',loginSubmit:'LOG IN',navProjects:'DIY Projects',navGames:'Mini-Games',navHow:'How it works',navValues:'Good Values',navReflect:'Reflection',
heroKicker:'PBL PROJECT \u2022 SMK SSAAS',heroOne:'Build arcades',heroTwo:'out of',heroThree:'waste.',
heroLead:'Eight real games built from discarded material — plus three digital twins that run on the same physics.',
explore:'See the 8 builds',playNow:'Enter the arcade',projectsStat:'recycled builds',reuseStat:'material reused',learningStat:'digital twins',scroll:'SCROLL TO START',
projectsEyebrow:'THE BUILD WORKSHOP',projectsTitleA:'Waste in.',projectsTitleB:'Games out.',
projectsIntro:'Eight builds, one method: collect, measure, cut, assemble, reinforce, calibrate — then play.',
filterAll:'All',filterEasy:'Easy',filterMedium:'Medium',filterHard:'Hard',
estimateNote:'Times and calories are estimates. Every cut is made by an adult, and each guide ends with a calibration test before the game counts.',
howEyebrow:'THE LEARNING LOOP',howTitleA:'Build it.',howTitleB:'Then play it.',
howIntro:'Every physical build has a digital twin, so the same skill is trained twice.',
howOneTitle:'Collect and choose',howOneText:'Pick a project by difficulty, then gather the tools and material quantities listed in its guide.',
howTwoTitle:'Build in six steps',howTwoText:'Clean, measure, cut, assemble, reinforce, calibrate. Nothing is cut before it is measured.',
howThreeTitle:'Play its digital twin',howThreeText:'Test the same idea on screen: air-boost routes, conveyor sorting or centre-of-gravity stacking.',howFourTitle:'Reflect and refine',howFourText:'Save the score, note what changed, then adjust the build before the next round.',
gamesEyebrow:'THE DIGITAL TWINS',gamesIntro:'Three digital twins with rules you can read: limited resources, visible consequences, no random deaths.',
runTag:'Plan the route',rushTag:'Sort before it drops',towerTag:'Hold the balance',
studentName:'PLAYER NAME',score:'SCORE',time:'TIME',items:'TOKENS',combo:'COMBO',level:'LEVEL',best:'BEST',lives:'LIVES',boost:'BOOST',speed:'BELT',balance:'BALANCE',wind:'WIND',floors:'FLOORS',round:'ROUND',
runHelp:'10 level challenges featuring speed boosts, jump boosts, shields, litter drones, and quota gates.',
startGame:'START LEVEL 1',move:'move',jump:'jump / boost',pause:'Pause',reset:'Restart',
runHint:'Arrow keys or A and D to run, W or Space to jump. A second jump in mid-air spends one air boost.',
rushPrompt:'Sort the front item before it falls off the end of the belt.',
paper:'Paper',plastic:'Plastic',metal:'Metal',glass:'Glass',landfill:'Landfill',
rushHelp:'A live conveyor carries the items. Sort early for more points, and send contaminated items to landfill.',
startSort:'START ROUND 1',
rushHint:'Number keys match the visible bins. Sorting early scores a bigger bonus than sorting at the last second.',
towerHelp:'The balance meter tracks the tower\u2019s centre of gravity. Wind is announced before each drop, so every collapse is your call.',
startBuild:'START BUILDING',drop:'RELEASE',
towerHint:'Space releases the box. Keep the balance meter under 100% or the tower topples.',
sessionProgress:'SESSION PROGRESS',achievementStart:'Play any game to unlock achievements.',
valuesEyebrow:'VALUES THAT LAST',valuesTitleA:'Play with your hands.',valuesTitleB:'Learn with your heart.',
valuesIntro:'Every material saved is a small step toward a bigger sense of responsibility.',
islamTitle:'ISLAMIC EDUCATION',islamQuote:'\u201cDo not spread corruption on the earth after it has been set right...\u201d',
islamOne:'Stewardship',islamOneText:'Manage waste responsibly at school.',
islamTwo:'Avoiding Waste',islamTwoText:'Turn used materials into useful play equipment.',
islamThree:'Kindness to Nature',islamThreeText:'Protect cleanliness through recycled invention.',
moralTitle:'MORAL EDUCATION',moralQuote:'\u201cThe Earth is not inherited from our ancestors; it is borrowed from future generations.\u201d',
moralCitation:'Popular sustainability saying',
moralOne:'Environmental Sustainability',moralOneText:'Practise the 3Rs to reduce waste.',
moralTwo:'Reasoning & Creativity',moralTwoText:'Design equipment that is safe and functional.',
moralThree:'Responsibility',moralThreeText:'Work together to build environmental awareness.',
ecoJoke:'Eco joke corner',
islamJoke:'Even a plastic bottle can have a future as a running hurdle\u2014when will your second life begin? \ud83d\ude1c',
moralJoke:'Recycled cardboard is tough\u2014it does not tear as quickly as a heart after being ghosted! \ud83d\udc94',
reflectEyebrow:'PAUSE & REFLECT',reflectTitleA:'Play. Think.',reflectTitleB:'Write it down.',
reflectIntro:'Note what you learned, keep your score, and watch your session progress grow.',
formTitle:'Send your reflection',
privacy:'\ud83d\udd12 Reflections stay on this device only. Avoid entering personal information.',
gameTried:'Game attempted',chooseGame:'Choose a game',learned:'What did you learn?',sendReflection:'SEND REFLECTION',
leaderboard:'Your top scores',scorePrivacy:'Scores stay on this device to protect your privacy.',
studentReflections:'Student reflections',exportData:'Export data',clearData:'Clear data',
footerText:'Turning discarded material into an arcade you can build, play and think about.',
clearTitle:'Clear all data?',clearText:'Saved scores, reflections, achievements and the player name will be removed from this device.',
cancel:'Cancel',confirmClear:'Yes, clear'};
const tr=(ms,en)=>lang==='en'?en:ms;
/* ============ V10 build guides ============
   Every guide follows one logical order:
   1 Collect & clean  2 Measure & mark  3 Cut (adult)  4 Assemble
   5 Reinforce & fit-test  6 Calibrate, then play by written rules.
   Each guide also carries a tools list, quantities, a tuning fix and a
   safety note that matches the actual risk of that build.               */
const S=(tms,ten,dms,den)=>({t:[tms,ten],d:[dms,den]});
const PROJECTS=[
{id:1,level:'easy',levelText:['Mudah','Easy'],name:['Boling Kadbod','Cardboard Bowling'],icon:'\ud83c\udfb3',color:'#ffc94a',prep:5,build:12,play:15,cal:'15\u201330',activity:['Rendah','Low'],players:['1\u20134','1\u20134'],twin:'run',
learn:['Daya, geseran & pusat graviti','Force, friction & centre of gravity'],
desc:['Pin berpemberat yang benar-benar jatuh seperti boling sebenar.','Weighted pins that actually topple like real bowling.'],
tools:[['Gunting (dewasa)','Scissors (adult)'],['Pembaris 30 cm','30 cm ruler'],['Marker','Marker'],['Pita pelekat','Tape']],
materials:[['1 kotak kasut / kadbod A3','1 shoebox / A3 cardboard'],['6 tiub tisu','6 tissue tubes'],['6 sudu beras atau pasir','6 spoons of rice or sand'],['1 bola ping pong','1 ping-pong ball']],
steps:[
S('Kumpul & bersihkan','Collect & clean','Cuci tiub dan kotak daripada habuk, keringkan sepenuhnya. Kadbod lembap akan melengkung dan pin tidak akan berdiri tegak.','Wipe the tubes and box free of dust and dry them fully. Damp cardboard warps and the pins will not stand straight.'),
S('Ukur & tanda lorong','Measure & mark the lane','Tanda lorong 90 cm \u00d7 20 cm pada kadbod, dengan garisan lipat 5 cm di kiri dan kanan untuk dinding. Tanda dahulu, jangan potong dahulu.','Mark a 90 cm \u00d7 20 cm lane with a 5 cm fold line down each side for the walls. Mark first, never cut first.'),
S('Potong (bantuan dewasa)','Cut (adult helps)','Orang dewasa memotong mengikut garisan yang ditanda sahaja, kemudian lipat dinding ke atas dan balut semua tepi dengan pita.','An adult cuts only along the marked lines, then fold the walls up and tape every edge.'),
S('Bina pin berpemberat','Build weighted pins','Potong 6 tiub setinggi 12 cm. Tutup satu hujung dengan pita, masukkan 1 sudu beras, tutup hujung kedua, kemudian nomborkan 1\u20136.','Trim 6 tubes to 12 cm. Tape one end shut, pour in 1 spoon of rice, seal the other end, then number them 1\u20136.'),
S('Tanda kedudukan pin','Mark the pin spots','Lukis segi tiga 1\u20132\u20133 dengan jarak 12 cm di hujung lorong dan tampal dinding penahan 6 cm supaya bola tidak terpelanting keluar.','Draw a 1\u20132\u20133 triangle with 12 cm spacing at the end of the lane and tape a 6 cm back wall so the ball cannot bounce out.'),
S('Uji & kalibrasi','Test & calibrate','Golek 5 kali dari 2 m. Jika tiada pin jatuh, buang \u00bd sudu beras. Jika semua jatuh setiap kali, tambah \u00bd sudu.','Roll 5 times from 2 m. If no pins fall, remove \u00bd spoon of rice. If they all fall every time, add \u00bd spoon.')],
rules:[['2 golekan setiap giliran, 5 giliran seorang.','2 rolls per turn, 5 turns each.'],['1 mata setiap pin; 6 pin dalam golekan pertama = 10 mata.','1 point per pin; all 6 on the first roll = 10 points.'],['Pin disusun semula pada tanda yang sama setiap giliran.','Reset the pins on the same marks every turn.']],
tune:['Bola melompat keluar lorong? Tinggikan dinding sisi kepada 6 cm dan golek dari paras lantai, bukan dari paras pinggang.','Ball jumping out of the lane? Raise the side walls to 6 cm and roll from floor level, not waist level.'],
safety:['Beras mesti dimeterai rapat supaya tidak tumpah dan menyebabkan tergelincir.','Seal the rice tightly so it cannot spill and become a slip hazard.']},

{id:2,level:'medium',levelText:['Sederhana','Medium'],name:['Sasaran Jaring Kadbod','Cardboard Netball Target'],icon:'\ud83c\udfd0',color:'#6ed0d9',prep:8,build:20,play:15,cal:'30\u201350',activity:['Sederhana','Medium'],players:['1\u20136','1\u20136'],twin:'run',
learn:['Sudut lontaran & kestabilan','Throwing angles & stability'],
desc:['Papan sasaran berdiri sendiri dengan tiga garisan mata.','A free-standing target board with three scoring lines.'],
tools:[['Gunting / pisau (dewasa)','Scissors / knife (adult)'],['Pembaris','Ruler'],['Pinggan bulat sebagai acuan','Round plate as a template'],['Pita pelekat','Tape']],
materials:[['1 kotak kadbod besar','1 large cardboard box'],['8 tali getah','8 rubber bands'],['Kertas lama untuk 3 bola','Old paper for 3 balls'],['1 botol berisi air (pemberat)','1 water-filled bottle (weight)']],
steps:[
S('Kumpul & ratakan','Collect & flatten','Buka kotak menjadi kepingan rata dan pilih bahagian yang paling tebal dan tidak berkedut untuk papan utama.','Open the box into a flat sheet and choose the thickest, least creased panel for the main board.'),
S('Ukur papan & kaki','Measure board & foot','Tanda papan 40 \u00d7 50 cm, dan satu jalur kaki 50 \u00d7 25 cm. Surih pinggan untuk melukis bulatan sasaran 18 cm \u2014 lukis dahulu supaya bulat sempurna.','Mark a 40 \u00d7 50 cm board plus a 50 \u00d7 25 cm foot strip. Trace a plate for the 18 cm target circle so it is perfectly round before cutting.'),
S('Potong (bantuan dewasa)','Cut (adult helps)','Orang dewasa memotong papan, jalur kaki dan bulatan sasaran, kemudian balut semua tepi dengan pita.','An adult cuts the board, the foot strip and the target circle, then tape all edges.'),
S('Pasang jaring & kaki','Fit the net & foot','Silangkan 8 tali getah di belakang lubang sebagai jaring, kemudian lipat jalur kaki menjadi segi tiga dan tampal di belakang papan.','Cross 8 rubber bands behind the hole as a net, then fold the foot strip into a triangle and tape it behind the board.'),
S('Kukuhkan & uji berdiri','Reinforce & stand-test','Letak botol berisi air di atas kaki segi tiga. Tolak papan perlahan \u2014 jika ia tumbang, panjangkan kaki 5 cm lagi.','Sit the water bottle on the triangular foot. Push the board gently \u2014 if it tips, extend the foot by another 5 cm.'),
S('Kalibrasi jarak','Calibrate the distances','Buat 3 bola kertas 6 cm yang dibalut pita. Tanda garisan 1 m, 1.5 m dan 2 m, kemudian uji 5 balingan dari setiap garisan.','Make three 6 cm taped paper balls. Mark 1 m, 1.5 m and 2 m lines, then test 5 throws from each line.')],
rules:[['6 balingan seorang, dua daripada setiap garisan.','6 throws each, two from every line.'],['1 m = 1 mata, 1.5 m = 2 mata, 2 m = 3 mata.','1 m = 1 point, 1.5 m = 2 points, 2 m = 3 points.'],['Bola yang mengenai papan tetapi tidak masuk = 0 mata.','A ball that hits the board but misses the hole scores 0.']],
tune:['Papan bergoyang setiap kali kena? Tambah botol kedua pada kaki atau tampal kaki pada lantai dengan pita.','Board wobbling on every hit? Add a second bottle to the foot or tape the foot to the floor.'],
safety:['Jangan sesekali menyandarkan papan pada tangga atau tingkap.','Never lean the board against stairs or a window.']},

{id:3,level:'easy',levelText:['Sangat Mudah','Very Easy'],name:['Sasar Gelang Botol','Bottle Ring Toss'],icon:'\u2b55',color:'#d8f45f',prep:5,build:10,play:15,cal:'10\u201325',activity:['Rendah','Low'],players:['1\u20134','1\u20134'],twin:'rush',
learn:['Ketepatan & anggaran jarak','Accuracy & distance estimation'],
desc:['Tiga botol berpemberat pada satu tapak, dengan gelang bersaiz teruji.','Three weighted bottles on one base, with correctly sized rings.'],
tools:[['Gunting','Scissors'],['Pembaris','Ruler'],['Pita pelekat','Tape'],['Marker','Marker']],
materials:[['3 botol plastik','3 plastic bottles'],['Pasir atau air','Sand or water'],['1 kadbod tapak 30 \u00d7 30 cm','1 cardboard base 30 \u00d7 30 cm'],['Surat khabar lama','Old newspaper']],
steps:[
S('Bersih & keringkan botol','Clean & dry the bottles','Bilas botol, buang label dan keringkan. Botol yang berminyak tidak akan melekat pada pita.','Rinse the bottles, remove the labels and dry them. Greasy bottles will not hold tape.'),
S('Bina tapak dahulu','Build the base first','Potong kadbod 30 \u00d7 30 cm dan tanda tiga bulatan berjarak 10 cm. Tapak dibina dahulu supaya kedudukan botol tidak berubah.','Cut a 30 \u00d7 30 cm base and mark three circles 10 cm apart. Building the base first keeps the bottle spacing fixed.'),
S('Beri pemberat','Add the weight','Isi setiap botol satu pertiga dengan pasir atau air dan tutup rapat. Kosong = tumbang setiap kali gelang mengenainya.','Fill each bottle one-third with sand or water and cap it tightly. Empty bottles fall over on every touch.'),
S('Pasang botol','Fix the bottles','Tampal setiap botol pada tanda bulatan dengan pita bersilang. Goyangkan tapak \u2014 botol tidak boleh bergerak.','Tape each bottle onto its circle with crossed tape. Shake the base \u2014 the bottles must not move.'),
S('Buat & uji gelang','Make & fit-test the rings','Gulung surat khabar menjadi 4 gelang berdiameter 18 cm dan balut pita. Uji: gelang mesti melepasi botol dengan ruang lega \u00b13 cm.','Roll newspaper into four 18 cm rings and wrap them in tape. Fit-test: each ring must clear the bottle with about 3 cm to spare.'),
S('Kalibrasi jarak balingan','Calibrate the throw lines','Tanda garisan 1.5 m, 2 m dan 2.5 m. Baling 4 gelang dari setiap garisan untuk mengesahkan ia boleh dicapai.','Mark 1.5 m, 2 m and 2.5 m lines. Throw 4 rings from each line to confirm they are reachable.')],
rules:[['4 gelang setiap giliran, dibaling dari bawah paras pinggang.','4 rings per turn, thrown underarm from below the waist.'],['Botol hadapan 1 mata, tengah 2 mata, belakang 3 mata.','Front bottle 1 point, middle 2, back 3.'],['Gelang yang melantun keluar tidak dikira.','Rings that bounce off do not count.']],
tune:['Gelang terlalu ringan dan melayang? Tambah satu lapisan pita penuh untuk menambah berat.','Rings too light and drifting? Add one more full layer of tape to give them weight.'],
safety:['Gunakan pasir kering sahaja; pasir basah menjadikan botol licin.','Use dry sand only; wet sand makes the bottles slippery.']},

{id:4,level:'medium',levelText:['Sederhana','Medium'],name:['Tali Lompat Getah','Rubber-band Skipping Rope'],icon:'\u27b0',color:'#f4a078',prep:6,build:18,play:10,cal:'40\u201380',activity:['Tinggi','High'],players:['1\u20133','1\u20133'],twin:'run',
learn:['Panjang, irama & koordinasi','Length, rhythm & coordination'],
desc:['Tali lompat yang dipotong mengikut ketinggian pengguna sebenar.','A skipping rope sized to the actual user\u2019s height.'],
tools:[['Pita pelekat kain','Cloth tape'],['Pembaris / pita ukur','Ruler / measuring tape'],['Gunting','Scissors']],
materials:[['40\u201360 tali getah','40\u201360 rubber bands'],['2 tiub tisu','2 tissue tubes'],['2 penutup botol','2 bottle caps'],['Beg plastik lama (balutan)','Old plastic bag (wrap)']],
steps:[
S('Periksa getah','Check the bands','Regangkan setiap getah sekali. Buang yang retak atau melekit \u2014 getah rapuh akan putus semasa melompat.','Stretch every band once. Discard cracked or sticky ones \u2014 brittle rubber snaps mid-jump.'),
S('Ukur panjang sasaran','Measure the target length','Panjang tali = tinggi anda + 90 cm. Catat nombor ini sebelum menyambung apa-apa.','Rope length = your height + 90 cm. Write this number down before linking anything.'),
S('Bina dua rantai','Build two chains','Sambung getah satu demi satu menjadi dua rantai, setiap satu 10 cm lebih pendek daripada panjang sasaran.','Link the bands into two chains, each 10 cm shorter than the target length.'),
S('Pintal & kukuhkan','Twist & reinforce','Pintal kedua-dua rantai bersama dan balut pita setiap 25 cm supaya ia tidak terurai atau memanjang.','Twist the two chains together and tape every 25 cm so the rope cannot unravel or stretch.'),
S('Pasang pemegang','Fit the handles','Masukkan setiap hujung ke dalam tiub tisu, ikat simpulan, kemudian tampal penutup botol di hujung tiub supaya tali tidak tergelincir keluar.','Feed each end into a tissue tube, knot it, then tape a bottle cap over the tube end so the rope cannot slip out.'),
S('Uji panjang sebenar','Test the real length','Pijak tengah tali \u2014 pemegang mesti sampai ke paras ketiak. Terlalu panjang: buang 2 getah. Terlalu pendek: tambah 2.','Stand on the middle of the rope \u2014 the handles should reach your armpits. Too long: remove 2 bands. Too short: add 2.')],
rules:[['Cabaran 30 saat: kira lompatan berterusan tanpa tersangkut.','30-second challenge: count unbroken jumps.'],['Tersangkut = pusingan tamat, catat skor.','A trip ends the round \u2014 record the score.'],['Pusingan berpasangan: dua pemain memusing, seorang melompat.','Pair round: two players turn the rope, one jumps.']],
tune:['Tali melecur tangan? Balut pemegang dengan jalur beg plastik sebagai lapisan lembut.','Rope burning your hands? Wrap the handles with plastic-bag strips as a soft grip.'],
safety:['Perlu ruang lapang 2 m dan lantai tidak licin. Jangan melompat berhampiran meja atau tingkap.','Needs 2 m of clear, non-slip floor. Never skip near desks or windows.']},

{id:5,level:'hard',levelText:['Sukar','Hard'],name:['Arena Bola Sepak Eco','Eco Football Arena'],icon:'\u26bd',color:'#f27a3b',prep:10,build:30,play:20,cal:'50\u201390',activity:['Sederhana','Medium'],players:['2','2'],twin:'tower',
learn:['Geometri padang & daya jentikan','Pitch geometry & flick force'],
desc:['Padang meja dua pemain dengan gol bersaiz sama dan bola bulat teruji.','A two-player table pitch with matched goals and a round-tested ball.'],
tools:[['Pisau / gunting (dewasa)','Knife / scissors (adult)'],['Pembaris panjang','Long ruler'],['Marker','Marker'],['Pita pelekat','Tape']],
materials:[['1 kotak kadbod (min. 60 \u00d7 40 cm)','1 cardboard box (min. 60 \u00d7 40 cm)'],['2 botol plastik','2 plastic bottles'],['2 penyepit baju','2 clothes pegs'],['Kertas lama','Old paper']],
steps:[
S('Sediakan kotak','Prepare the box','Buang pita lama dan pastikan tapak kotak rata. Tapak yang bengkok menyebabkan bola sentiasa bergolek ke satu sisi.','Remove old tape and make sure the base is flat. A warped base makes the ball always roll to one side.'),
S('Tanda padang','Mark the pitch','Tanda padang 60 \u00d7 40 cm, garis tengah, dua kawasan gol 12 cm dan dinding 8 cm pada keempat-empat sisi.','Mark a 60 \u00d7 40 cm pitch, the halfway line, two 12 cm goal areas and 8 cm walls on all four sides.'),
S('Potong (bantuan dewasa)','Cut (adult helps)','Orang dewasa memotong dinding dan dua bukaan gol 12 cm lebar \u00d7 8 cm tinggi \u2014 ukur kedua-duanya supaya betul-betul sama.','An adult cuts the walls and two goal openings 12 cm wide \u00d7 8 cm high \u2014 measure both so they match exactly.'),
S('Bina gol & penjentik','Build goals & flickers','Potong botol separuh sebagai bingkai gol dan tampal. Setiap pemain memegang satu penyepit baju sebagai penjentik.','Cut the bottles in half as goal frames and tape them in. Each player holds a clothes peg as a flicker.'),
S('Buat bola & uji bulat','Make the ball & roll-test','Renyukkan kertas menjadi bola 3 cm dan balut pita. Ujian bulat: bola mesti bergolek lurus sejauh 30 cm di atas meja.','Crush paper into a 3 cm ball and tape it. Roll test: it must travel 30 cm in a straight line on a table.'),
S('Kalibrasi permainan','Calibrate the match','Main 1 minit percubaan. Jika terlalu banyak gol, kecilkan bukaan gol kepada 10 cm; jika terlalu sedikit, besarkan kepada 14 cm.','Play a 1-minute trial. Too many goals: narrow the openings to 10 cm. Too few: widen them to 14 cm.')],
rules:[['Perlawanan 3 minit atau gol pertama ke-5.','3-minute match or first to 5 goals.'],['Bola hanya dijentik atau ditiup \u2014 tangan tidak boleh menyentuh bola.','Flick or blow only \u2014 hands may not touch the ball.'],['Bola keluar padang: mula semula dari garis tengah.','Ball out of play: restart from the halfway line.']],
tune:['Bola tersangkut di sudut? Tampal segi tiga kadbod kecil pada setiap sudut padang.','Ball sticking in the corners? Tape a small cardboard triangle into each corner.'],
safety:['Botol dipotong oleh orang dewasa dan setiap tepi potongan dibalut pita.','Bottles are cut by an adult and every cut edge is taped over.']},

{id:6,level:'easy',levelText:['Sangat Mudah','Very Easy'],name:['Cabaran Jaring Sampah','Eco Bin Net Challenge'],icon:'\ud83d\uddd1\ufe0f',color:'#a8d88f',prep:8,build:10,play:10,cal:'20\u201340',activity:['Sederhana','Medium'],players:['2\u20138','2\u20138'],twin:'rush',
learn:['Kategori kitar semula & pencemaran bahan','Recycling categories & contamination'],
desc:['Versi fizikal Recycle Rush \u2014 termasuk tong bahan tidak boleh dikitar semula.','The physical twin of Recycle Rush \u2014 including a landfill bin.'],
tools:[['Marker tebal','Thick marker'],['Pita pelekat','Tape'],['Kad label','Label cards']],
materials:[['4 tong atau kotak','4 bins or boxes'],['12 bahan contoh yang bersih','12 clean sample items'],['Kadbod untuk bingkai','Cardboard for rims'],['Pemasa telefon','Phone timer']],
steps:[
S('Kumpul & basuh bahan','Collect & wash the items','Basuh dan keringkan 12 bahan contoh. Bahan berminyak atau basah tidak boleh digunakan \u2014 itulah sebabnya ia masuk tong sisa.','Wash and dry 12 sample items. Greasy or wet items cannot be used \u2014 which is exactly why they belong in landfill.'),
S('Label empat kategori','Label four categories','Label KERTAS, PLASTIK, LOGAM dan SISA (tidak boleh dikitar semula). Gunakan warna berbeza, bukan warna sahaja \u2014 tulis perkataan penuh.','Label PAPER, PLASTIC, METAL and LANDFILL. Use different colours, but always write the full word too.'),
S('Pasang bingkai tong','Fit the bin rims','Tampal bingkai kadbod pada mulut setiap tong supaya bukaan sama saiz dan mata adalah adil.','Tape a cardboard rim onto each bin so every opening is the same size and scoring stays fair.'),
S('Susun & tanda garisan','Arrange & mark the line','Susun tong dalam satu baris berjarak 40 cm dan tanda garisan balingan 1.5 m.','Line the bins up 40 cm apart and mark a 1.5 m throwing line.'),
S('Asing bahan jebakan','Set the trap items','Selitkan 3 bahan jebakan (kotak piza berminyak, tisu terpakai, cawan seramik) yang mesti masuk tong SISA.','Slip in 3 trap items (greasy pizza box, used tissue, ceramic cup) that must go to LANDFILL.'),
S('Uji pusingan percubaan','Run a trial round','Cuba 30 saat dengan 2 tong dahulu, kemudian 4 tong. Jika semua orang mendapat markah penuh, undurkan garisan 0.5 m.','Try 30 seconds with 2 bins first, then 4. If everyone scores full marks, move the line back 0.5 m.')],
rules:[['30 saat setiap pemain, satu bahan pada satu masa.','30 seconds per player, one item at a time.'],['+2 mata tong betul, \u22121 mata tong salah, 0 jika terlepas.','+2 correct bin, \u22121 wrong bin, 0 for a miss.'],['Bahan jebakan bernilai +3 jika masuk tong SISA.','Trap items are worth +3 in the LANDFILL bin.']],
tune:['Terlalu mudah? Tambah tong KACA dan gunakan bahan yang serupa warna.','Too easy? Add a GLASS bin and use items of similar colour.'],
safety:['Tiada kaca sebenar atau tin bertepi tajam \u2014 gunakan gambar kad sebagai ganti.','No real glass or sharp-edged cans \u2014 use picture cards instead.']},

{id:7,level:'hard',levelText:['Sukar','Hard'],name:['Gawang Lompat Eco','Eco Running Hurdles'],icon:'\ud83c\udfc3',color:'#7ecbd0',prep:8,build:20,play:20,cal:'60\u2013100',activity:['Tinggi','High'],players:['2\u20136','2\u20136'],twin:'run',
learn:['Kelajuan, langkah & keselamatan sukan','Speed, stride & sport safety'],
desc:['Laluan halangan dengan palang yang sengaja jatuh apabila disentuh.','A hurdle course with bars designed to fall when touched.'],
tools:[['Pita ukur','Measuring tape'],['Marker','Marker'],['Gunting','Scissors'],['Pita pelekat','Tape']],
materials:[['8 botol plastik','8 plastic bottles'],['Air','Water'],['4 jalur kadbod 80 cm','4 cardboard strips 80 cm'],['8 penutup botol','8 bottle caps']],
steps:[
S('Isi botol','Fill the bottles','Isi setiap botol satu pertiga dengan air dan tutup rapat. Botol kosong akan berterbangan ditiup angin.','Fill each bottle one-third with water and cap it. Empty bottles blow over in the wind.'),
S('Ukur laluan','Measure the lane','Tanda laluan lurus 12 m dengan tanda gawang setiap 2 m. Jarak sama = langkah yang konsisten.','Mark a straight 12 m lane with hurdle marks every 2 m. Equal spacing means a consistent stride.'),
S('Buat penyangkut palang','Make the bar rests','Tampal penutup botol secara terbalik pada sisi botol pada ketinggian 15 cm, 20 cm dan 25 cm mengikut aras.','Tape bottle caps upside down on the bottle sides at 15 cm, 20 cm and 25 cm for each level.'),
S('Letak palang (jangan tampal)','Lay the bars (do not tape)','Letak jalur kadbod di atas penyangkut tanpa pita. Palang mesti boleh jatuh \u2014 palang yang ditampal menyebabkan pelari tersandung.','Rest the cardboard strips on the caps with no tape. Bars must be able to fall \u2014 taped bars trip runners.'),
S('Ujian berjalan','Walk-through test','Berjalan melalui keseluruhan laluan dua kali. Setiap palang mesti jatuh dengan mudah apabila disentuh lutut.','Walk the full course twice. Every bar must drop easily when a knee touches it.'),
S('Kalibrasi ketinggian','Calibrate the height','Mula pada 15 cm. Naikkan ke 20 cm hanya selepas semua pemain berjaya melompat tanpa menjatuhkan palang.','Start at 15 cm. Move to 20 cm only after every player clears the course without dropping a bar.')],
rules:[['Larian bermasa: +2 saat penalti bagi setiap palang jatuh.','Timed run: +2 second penalty per bar knocked down.'],['Seorang pemain pada satu masa di atas laluan.','One runner on the course at a time.'],['Tiga pusingan; catat masa terbaik.','Three rounds; record the best time.']],
tune:['Palang terlalu kerap jatuh? Lebarkan jalur kepada 6 cm supaya ia duduk lebih stabil di atas penutup.','Bars falling too often? Widen the strips to 6 cm so they sit more stably on the caps.'],
safety:['Lantai tidak licin, berkasut sukan, dan tiada larian di kawasan berair.','Non-slip floor, sports shoes on, and never run on a wet surface.']},

{id:8,level:'medium',levelText:['Sederhana','Medium'],name:['Katapult Bola Keranjang','Eco Catapult Basketball'],icon:'\ud83c\udfc0',color:'#efb45f',prep:6,build:18,play:15,cal:'10\u201320',activity:['Rendah','Low'],players:['1\u20134','1\u20134'],twin:'tower',
learn:['Sudut 45\u00b0, tuil & daya anjal','45\u00b0 angles, levers & elastic force'],
desc:['Katapult dengan blok sudut tetap supaya setiap lontaran boleh diramal.','A catapult with a fixed angle block so every shot is repeatable.'],
tools:[['Gam / pita kuat','Glue / strong tape'],['Pembaris','Ruler'],['Gunting','Scissors'],['Marker','Marker']],
materials:[['Kadbod tebal (3 lapis)','Thick cardboard (3 layers)'],['1 penyepit baju kayu','1 wooden clothes peg'],['1 penutup botol','1 bottle cap'],['Bola kertas 2 cm','2 cm paper balls']],
steps:[
S('Sediakan kadbod','Prepare the cardboard','Potong 3 keping kadbod 15 \u00d7 10 cm. Satu lapisan akan melentur dan menghilangkan tenaga \u2014 tiga lapisan tidak.','Cut three 15 \u00d7 10 cm pieces. A single layer flexes and absorbs the energy \u2014 three layers do not.'),
S('Lekat tapak berlapis','Glue the layered base','Lekat ketiga-tiga lapisan dan tekan di bawah buku selama 5 minit sehingga benar-benar rata dan keras.','Glue all three layers and press under a book for 5 minutes until completely flat and rigid.'),
S('Pasang tuil','Mount the lever','Tampal penyepit baju di tengah tapak, rahang terbuka menghadap ke hadapan. Itulah tuil anda.','Tape the clothes peg in the centre of the base with the jaws facing forward. That is your lever.'),
S('Pasang cawan bola','Attach the ball cup','Lekat penutup botol pada rahang atas penyepit sebagai cawan bola.','Glue the bottle cap to the upper jaw of the peg as the ball cup.'),
S('Bina blok sudut 45\u00b0','Build the 45\u00b0 stop block','Lipat segi tiga kadbod 45\u00b0 dan tampal di belakang rahang supaya setiap lontaran berhenti pada sudut yang sama.','Fold a 45\u00b0 cardboard triangle and tape it behind the jaw so every shot stops at the same angle.'),
S('Kalibrasi jarak','Calibrate the range','Letak bakul 30 cm di hadapan dan lontar 5 kali. Undurkan bakul 5 cm selepas setiap 3 jaringan berturut-turut.','Place the basket 30 cm ahead and fire 5 shots. Move it back 5 cm after every 3 baskets in a row.')],
rules:[['5 lontaran setiap giliran dari garisan yang sama.','5 shots per turn from the same line.'],['30 cm = 1 mata, 45 cm = 2 mata, 60 cm = 3 mata.','30 cm = 1 point, 45 cm = 2 points, 60 cm = 3 points.'],['Katapult mesti kekal di belakang garisan lontaran.','The catapult must stay behind the firing line.']],
tune:['Bola terbang terlalu tinggi? Rendahkan blok sudut kepada 35\u00b0 dan tekan tuil dengan lebih perlahan.','Ball flying too high? Lower the stop block to 35\u00b0 and press the lever more gently.'],
safety:['Jangan sesekali melontar ke arah muka atau ke arah orang lain. Bola kertas sahaja \u2014 tiada batu atau penutup logam.','Never fire towards a face or another person. Paper balls only \u2014 no stones or metal caps.']}
];
const pick=a=>a[lang==='en'?1:0];
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2300)}
/* Boot, navigation, motion and ambient effects */
function finishBoot(){setTimeout(()=>$('#boot')?.classList.add('done'),motionOff?80:760)}window.addEventListener('load',finishBoot,{once:true});setTimeout(finishBoot,1500);
const header=$('#site-header'),progress=$('#scroll-progress');let scrollTick=false;function onScroll(){if(scrollTick)return;scrollTick=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;header.classList.toggle('scrolled',scrollY>20);scrollTick=false})}addEventListener('scroll',onScroll,{passive:true});onScroll();
const menu=$('#menu-button'),nav=$('#nav-links');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
const revealObserver='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');revealObserver.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'}):null;function observeReveals(root=document){$$('.reveal',root).forEach((el,i)=>{if(!el.dataset.autoDelay&&el.classList.contains('project-card'))el.style.transitionDelay=`${Math.min(i%4,3)*65}ms`;if(revealObserver)revealObserver.observe(el);else el.classList.add('in-view')})}observeReveals();
const sectionObserver='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)$$('.nav-links>a').forEach(a=>a.classList.toggle('active',a.hash===`#${e.target.id}`))}),{rootMargin:'-35% 0px -55%'}):null;$$('main>section[id]').forEach(s=>sectionObserver?.observe(s));
let counted=false;const stats=$('.hero-stats');const statObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!counted){counted=true;$$('[data-count]',stats).forEach(el=>{const target=+el.dataset.count,suffix=el.dataset.suffix||'';if(motionOff){el.textContent=target+suffix;return}const start=performance.now(),dur=900;const tick=n=>{const p=Math.min(1,(n-start)/dur),v=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=v+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}});statObserver.observe(stats);
let pointerRAF=0,px=innerWidth/2,py=innerHeight/3;addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(pointerRAF||motionOff)return;pointerRAF=requestAnimationFrame(()=>{document.documentElement.style.setProperty('--mx',`${px}px`);document.documentElement.style.setProperty('--my',`${py}px`);pointerRAF=0})},{passive:true});
if(finePointer&&!lowPower){const visual=$('#hero-visual'),wrap=$('#arcade-wrap');visual.addEventListener('pointermove',e=>{if(motionOff)return;const b=visual.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;wrap.style.transform=`rotateY(${x*8}deg) rotateX(${-y*7}deg) translate3d(0,0,0)`});visual.addEventListener('pointerleave',()=>wrap.style.transform='');$$('.magnetic').forEach(btn=>{btn.addEventListener('pointermove',e=>{if(motionOff)return;const b=btn.getBoundingClientRect();btn.style.setProperty('--mag-x',`${(e.clientX-b.left-b.width/2)*.1}px`);btn.style.setProperty('--mag-y',`${(e.clientY-b.top-b.height/2)*.1}px`)});btn.addEventListener('pointerleave',()=>{btn.style.removeProperty('--mag-x');btn.style.removeProperty('--mag-y')})})}
const ambient={canvas:$('#ambient-canvas'),ctx:null,items:[],raf:0,w:0,h:0,dpr:1,pointer:{x:-999,y:-999}};
function resizeAmbient(){
	ambient.dpr=Math.min(devicePixelRatio||1,1.5);ambient.w=innerWidth;ambient.h=innerHeight;
	ambient.canvas.width=Math.round(ambient.w*ambient.dpr);ambient.canvas.height=Math.round(ambient.h*ambient.dpr);
	ambient.ctx=ambient.canvas.getContext('2d');ambient.ctx.setTransform(ambient.dpr,0,0,ambient.dpr,0,0);
	const count=motionOff?0:(animationMode===1?15:(lowPower?20:innerWidth<700?28:50));
	ambient.items=Array.from({length:count},()=>({
		x:Math.random()*ambient.w,
		y:Math.random()*ambient.h,
		r:1.5+Math.random()*3.5,
		vx:(Math.random()-.5)*(animationMode===0?.35:.2),
		vy:-.12-Math.random()*(animationMode===0?.4:.25),
		a:.1+Math.random()*.22,
		rot:Math.random()*Math.PI*2,
		vrot:(Math.random()-.5)*.03,
		type:Math.random()>.6?'recycle':(Math.random()>.5?'leaf':'star'),
		c:Math.random()>.65?'#f27a3b':(Math.random()>.35?'#d8f45f':'#46a171')
	}));
}
function drawAmbient(){
	cancelAnimationFrame(ambient.raf);
	if(motionOff||document.hidden||document.body.classList.contains('game-running'))return;
	const c=ambient.ctx;c.clearRect(0,0,ambient.w,ambient.h);
	for(const p of ambient.items){
		p.x+=p.vx;p.y+=p.vy;p.rot+=p.vrot;
		if(p.y<-20){p.y=ambient.h+20;p.x=Math.random()*ambient.w}
		if(p.x<-20)p.x=ambient.w+20;if(p.x>ambient.w+20)p.x=-20;
		c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.globalAlpha=p.a;c.fillStyle=p.c;c.strokeStyle=p.c;
		if(p.type==='recycle'){
			c.font=`${Math.round(p.r*3.5)}px sans-serif`;c.textAlign='center';c.textBaseline='middle';
			c.fillText('♻',0,0);
		}else if(p.type==='leaf'){
			c.beginPath();c.ellipse(0,0,p.r*1.8,p.r*0.9,0,0,Math.PI*2);c.fill();
		}else{
			c.beginPath();c.arc(0,0,p.r,0,Math.PI*2);c.fill();
		}
		c.restore();
	}
	c.globalAlpha=1;ambient.raf=requestAnimationFrame(drawAmbient);
}
let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{resizeAmbient();drawAmbient()},120)},{passive:true});resizeAmbient();drawAmbient();document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(ambient.raf);else drawAmbient()});
function setAnimationMode(mode, save=true){
	animationMode = ((mode % 3) + 3) % 3;
	motionOff = (animationMode === 2);
	document.body.classList.toggle('motion-off', animationMode === 2);
	document.body.classList.toggle('motion-toned', animationMode === 1);
	document.body.classList.toggle('motion-full', animationMode === 0);

	const btn = $('#motion-button');
	if (btn) {
		const icon = btn.querySelector('span') || btn;
		const labels = [
			{ icon: '✦✦✦', titleMs: 'Mod Animasi: PENUH', titleEn: 'Anim Mode: FULL', toastMs: 'Mod Animasi: Penuh', toastEn: 'Full Animations Enabled' },
			{ icon: '✦✦', titleMs: 'Mod Animasi: SEDERHANA', titleEn: 'Anim Mode: TONED', toastMs: 'Mod Animasi: Sederhana', toastEn: 'Toned Animations Enabled' },
			{ icon: '✦', titleMs: 'Mod Animasi: MATI', titleEn: 'Anim Mode: OFF', toastMs: 'Mod Animasi: Mati', toastEn: 'Animations Disabled' }
		];
		const cur = labels[animationMode];
		if (btn.querySelector('.anim-text')) {
			btn.querySelector('.anim-text').textContent = animationMode === 0 ? 'FULL' : (animationMode === 1 ? 'TONED' : 'OFF');
		} else {
			btn.innerHTML = `<span>${cur.icon}</span> <small class="anim-text" style="font-size:10px;font-weight:800;letter-spacing:0.5px;">${animationMode === 0 ? 'FULL' : (animationMode === 1 ? 'TONED' : 'OFF')}</small>`;
		}
		btn.setAttribute('aria-pressed', String(animationMode !== 2));
		btn.setAttribute('aria-label', lang === 'en' ? cur.titleEn : cur.titleMs);
		btn.setAttribute('title', lang === 'en' ? cur.titleEn : cur.titleMs);
		if (save) {
			storage.set('ecoArcadeV10AnimMode', animationMode);
			toast(lang === 'en' ? cur.toastEn : cur.toastMs);
		}
	}
	resizeAmbient();
	drawAmbient();
}

function setMotion(off, save=true){
	setAnimationMode(off ? 2 : 0, save);
}

$('#motion-button')?.addEventListener('click', ()=>{
	setAnimationMode((animationMode + 1) % 3, true);
});
setAnimationMode(animationMode, false);
/* Internationalisation */
function translateStatic(){$$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(!el.dataset.ms){const plus=el.querySelector(':scope>span');el.dataset.ms=plus?(el.firstChild?.textContent||'').trim():el.textContent}const value=lang==='en'?(EN[key]||el.dataset.ms):el.dataset.ms;const plus=el.querySelector(':scope>span');if(plus){if(el.firstChild)el.firstChild.textContent=`${value} `}else el.textContent=value});document.documentElement.lang=lang;$$('#language-button span').forEach((el,i)=>el.classList.toggle('active',i===(lang==='en'?1:0)));const namePlaceholder=tr('Masukkan nama','Enter your name');$$('.player-name').forEach(i=>i.placeholder=namePlaceholder);$('#reflection-name').placeholder=namePlaceholder;$('#reflection-text').placeholder=tr('Tulis refleksi ringkas...','Write a short reflection...');setAnimationMode(animationMode,false);renderProjects();fillGameSelect();renderCommunity();renderAchievements();refreshGameLanguage()}
$('#language-button').addEventListener('click',()=>{lang=lang==='ms'?'en':'ms';storage.set(STORE.lang,lang);translateStatic();toast(lang==='en'?'English enabled':'Bahasa Melayu diaktifkan')});
/* Project cards and guides */
/* ============ Project cards + build-guide dialog (V10) ============ */
let projectFilter='all';
const TWIN={run:'UpcycleVelocity',rush:'Recycle Rush',tower:'Cardboard Tower'};
function renderProjects(){
	const list=PROJECTS.filter(p=>projectFilter==='all'||p.level===projectFilter);
	$('#projects-grid').innerHTML=list.map(p=>`<article class="project-card reveal" style="--card-color:${p.color}"><div class="project-visual"><span class="project-number">0${p.id}</span><span class="difficulty">${escapeHTML(pick(p.levelText))}</span><span class="project-icon" aria-hidden="true">${p.icon}</span><i class="card-sheen" aria-hidden="true"></i></div><div class="project-body"><h3>${escapeHTML(pick(p.name))}</h3><p>${escapeHTML(pick(p.desc))}</p><div class="project-meta"><div><b>${p.prep+p.build}</b><small>${tr('MIN. BINA','BUILD MIN')}</small></div><div><b>${p.cal}</b><small>${tr('KALORI ANG.','EST. CAL')}</small></div><div><b>${escapeHTML(p.players[0])}</b><small>${tr('PEMAIN','PLAYERS')}</small></div></div><p class="project-learn"><i>\u25c8</i>${escapeHTML(pick(p.learn))}</p><button class="project-open" type="button" data-project="${p.id}">${tr('Lihat cara bina','View build guide')}<i>\u2197</i></button></div></article>`).join('');
	$('#project-count').textContent=tr(`${list.length} projek`,`${list.length} projects`);
	observeReveals($('#projects-grid'));
	if(finePointer&&!lowPower)attachCardTilt();
}
const guide=$('#guide-dialog');
function openGuide(id,push=true){
	const p=PROJECTS.find(x=>x.id===+id);if(!p)return;
	const total=p.prep+p.build+p.play;
	$('#guide-content').innerHTML=`<div class="guide-hero" style="--guide-color:${p.color}"><div class="guide-big-icon" aria-hidden="true">${p.icon}</div><div><p class="eyebrow"><span>0${p.id}</span><i>${tr('PANDUAN BINAAN','BUILD GUIDE')}</i></p><h2>${escapeHTML(pick(p.name))}</h2><p>${escapeHTML(pick(p.desc))}</p><div class="guide-chips"><span><b>${p.prep}\u2032</b>${tr('sedia','prep')}</span><span><b>${p.build}\u2032</b>${tr('bina','build')}</span><span><b>${p.play}\u2032</b>${tr('main','play')}</span><span class="total"><b>${total}\u2032</b>${tr('jumlah','total')}</span></div></div></div>
	<div class="guide-body"><div class="guide-split"><section><h3>${tr('Alatan','Tools')}</h3><div class="guide-tools tools">${p.tools.map(x=>`<span>${escapeHTML(pick(x))}</span>`).join('')}</div></section><section><h3>${tr('Bahan & kuantiti','Materials & quantity')}</h3><div class="guide-tools">${p.materials.map(x=>`<span>${escapeHTML(pick(x))}</span>`).join('')}</div></section></div>
	<h3>${tr('Enam langkah mengikut urutan','Six steps, in order')}</h3><ol class="guide-steps">${p.steps.map((x,i)=>`<li style="--i:${i}"><span>${String(i+1).padStart(2,'0')}</span><div><h4>${escapeHTML(pick(x.t))}</h4><p>${escapeHTML(pick(x.d))}</p></div></li>`).join('')}</ol>
	<div class="guide-split"><section class="guide-rules"><h3>${tr('Peraturan & pemarkahan','Rules & scoring')}</h3><ul>${p.rules.map(r=>`<li>${escapeHTML(pick(r))}</li>`).join('')}</ul></section><section class="guide-tune"><h3>${tr('Jika tidak menjadi','If it does not work')}</h3><p>${escapeHTML(pick(p.tune))}</p><p class="guide-twin">${tr('Kembar digital','Digital twin')}: <b>${TWIN[p.twin]}</b></p></section></div>
	<div class="safety-callout"><b>\ud83d\udee1 ${tr('Keselamatan khusus projek ini','Safety note for this build')}</b><br>${escapeHTML(pick(p.safety))}</div></div>`;
	guide.showModal();document.body.style.overflow='hidden';
	if(push)history.replaceState(null,'',`#projek-${p.id}`);
}
function attachCardTilt(){$$('.project-card').forEach(card=>{let raf=0,x=0,y=0;card.addEventListener('pointermove',e=>{if(motionOff)return;const b=card.getBoundingClientRect();x=(e.clientX-b.left)/b.width-.5;y=(e.clientY-b.top)/b.height-.5;if(raf)return;raf=requestAnimationFrame(()=>{card.style.transform=`perspective(800px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateY(-4px)`;raf=0})});card.addEventListener('pointerleave',()=>card.style.transform='')})}
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{projectFilter=btn.dataset.filter;$$('[data-filter]').forEach(b=>b.classList.toggle('active',b===btn));renderProjects()}));
$('#projects-grid').addEventListener('click',e=>{const btn=e.target.closest('[data-project]');if(btn)openGuide(btn.dataset.project)});$('.dialog-close').addEventListener('click',()=>guide.close());guide.addEventListener('click',e=>{if(e.target===guide)guide.close()});guide.addEventListener('close',()=>{document.body.style.overflow='';if(/^#projek-/.test(location.hash))history.replaceState(null,'',location.pathname+location.search)});if(/^#projek-([1-8])$/.test(location.hash))setTimeout(()=>openGuide(location.hash.split('-')[1],false),850);
/* Shared local data */
let activeGame='run';const savedName=storage.get(STORE.name,'');$$('.player-name').forEach(input=>{input.value=savedName;input.addEventListener('input',()=>syncName(input.value,input))});$('#reflection-name').value=savedName;function syncName(value,source){const clean=value.slice(0,28);$$('.player-name').forEach(input=>{if(input!==source)input.value=clean});if($('#reflection-name')!==source)$('#reflection-name').value=clean;storage.set(STORE.name,clean)}$('#reflection-name').addEventListener('input',e=>syncName(e.target.value,e.target));
function requireName(selector){const input=$(selector),name=input.value.trim();if(name.length<2){input.focus();toast(tr('Masukkan nama dahulu','Enter your name first'));return''}syncName(name,input);return name.slice(0,28)}
function saveScore(name,score,game){const scores=storage.get(STORE.scores,[]);scores.push({id:Date.now()+Math.random(),name:name.slice(0,28),score:Math.max(0,Math.round(score)),game,date:new Date().toISOString()});storage.set(STORE.scores,scores.sort((a,b)=>b.score-a.score).slice(0,40));unlockAchievement('first');renderCommunity()}
/* ============ Achievements + celebration layer (V10) ============ */
const ACH={
	first:{icon:'\ud83c\udf31',name:['Langkah pertama','First step'],hint:['Hantar skor pertama anda.','Post your first score.']},
	collect:{icon:'\u267b\ufe0f',name:['Pengumpul hijau','Green collector'],hint:['Kumpul 24 token dalam UpcycleVelocity.','Collect 24 tokens in UpcycleVelocity.']},
	sort:{icon:'\ud83e\uddf9',name:['Pakar 3R','3R expert'],hint:['Capai kombo \u00d78 dalam Recycle Rush.','Reach a \u00d78 combo in Recycle Rush.']},
	tower:{icon:'\ud83c\udfd7\ufe0f',name:['Jurubina menara','Tower builder'],hint:['Bina 8 tingkat tanpa tumbang.','Stack 8 floors without collapsing.']},
	finisher:{icon:'\ud83c\udfc1',name:['Pelari eco','Eco finisher'],hint:['Habiskan keempat-empat aras larian.','Clear all four running levels.']},
	sorter:{icon:'\ud83c\udfed',name:['Ketua talian','Line supervisor'],hint:['Selesaikan ketiga-tiga pusingan tali sawat.','Finish all three conveyor rounds.']},
	architect:{icon:'\ud83c\udfc6',name:['Arkitek kadbod','Cardboard architect'],hint:['Lengkapkan menara 15 tingkat.','Complete the 15-floor tower.']}};
const ACH_TOTAL=Object.keys(ACH).length;
function unlockAchievement(id){
	if(!ACH[id])return;
	const current=new Set(storage.get(STORE.achievements,[]));
	if(current.has(id))return;
	current.add(id);storage.set(STORE.achievements,[...current]);
	toast(`${ACH[id].icon} ${tr('Pencapaian dibuka','Achievement unlocked')}: ${pick(ACH[id].name)}`);
	audioBeep(880,.09);confetti(26);renderAchievements();
}
function renderAchievements(){
	const current=storage.get(STORE.achievements,[]);
	setText('#achievement-count',`${current.length} / ${ACH_TOTAL}`);
	setText('#achievement-copy',current.length?current.map(x=>ACH[x]?pick(ACH[x].name):x).join(' \u2022 '):tr('Main mana-mana permainan untuk membuka pencapaian.','Play any game to unlock achievements.'));
	const grid=$('#achievement-grid');
	if(grid)grid.innerHTML=Object.entries(ACH).map(([id,a],i)=>`<div class="ach-chip ${current.includes(id)?'unlocked':'locked'}" style="--i:${i}"><span aria-hidden="true">${current.includes(id)?a.icon:'\ud83d\udd12'}</span><b>${escapeHTML(pick(a.name))}</b><small>${escapeHTML(pick(a.hint))}</small></div>`).join('');
	const bar=$('#achievement-bar');if(bar)bar.style.transform=`scaleX(${(current.length/ACH_TOTAL).toFixed(3)})`;
}
/* Confetti: one shared canvas, skipped entirely when motion is reduced. */
let confCanvas=null,confCtx=null,confParts=[],confRAF=0;
function confetti(count=42){
	if(motionOff||reduceMotion)return;
	if(!confCanvas){
		confCanvas=document.createElement('canvas');confCanvas.className='confetti-layer';confCanvas.setAttribute('aria-hidden','true');
		document.body.appendChild(confCanvas);confCtx=confCanvas.getContext('2d');
	}
	const dpr=Math.min(2,devicePixelRatio||1);
	confCanvas.width=innerWidth*dpr;confCanvas.height=innerHeight*dpr;
	confCanvas.style.width=innerWidth+'px';confCanvas.style.height=innerHeight+'px';
	confCtx.setTransform(dpr,0,0,dpr,0,0);
	const colors=['#d8f45f','#ffc94a','#f27a3b','#6ed0d9','#ed5d48','#fffaf0'];
	const n=lowPower?Math.round(count*.5):count;
	for(let i=0;i<n;i++)confParts.push({x:innerWidth*(.2+Math.random()*.6),y:innerHeight*.28+Math.random()*40,
		vx:(Math.random()-.5)*340,vy:-180-Math.random()*300,g:520+Math.random()*220,
		w:5+Math.random()*7,h:8+Math.random()*10,rot:Math.random()*6,vr:(Math.random()-.5)*9,
		life:1.5+Math.random()*.9,color:colors[i%colors.length]});
	if(!confRAF){confLast=performance.now();confRAF=requestAnimationFrame(confLoop)}
}
let confLast=0;
function confLoop(now){
	const dt=Math.min(.05,(now-confLast)/1000);confLast=now;
	confCtx.clearRect(0,0,innerWidth,innerHeight);
	for(const p of confParts){p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;p.life-=dt;
		confCtx.save();confCtx.globalAlpha=clamp(p.life,0,1);confCtx.translate(p.x,p.y);confCtx.rotate(p.rot);
		confCtx.fillStyle=p.color;confCtx.fillRect(-p.w/2,-p.h/2,p.w,p.h);confCtx.restore()}
	confParts=confParts.filter(p=>p.life>0&&p.y<innerHeight+60);
	if(confParts.length)confRAF=requestAnimationFrame(confLoop);
	else{confRAF=0;confCtx.clearRect(0,0,innerWidth,innerHeight)}
}
/* Game tabs */
const tabButtons=$$('[data-tab]');function activateGame(id){activeGame=id;tabButtons.forEach(b=>{const on=b.dataset.tab===id;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});$$('[data-panel]').forEach(p=>{const on=p.dataset.panel===id;p.hidden=!on;p.classList.toggle('active',on)});if(id!=='run')pauseRun('switch');if(id!=='rush')pauseRush('switch');if(id!=='tower')pauseTower('switch')}
tabButtons.forEach((b,i)=>{b.addEventListener('click',()=>activateGame(b.dataset.tab));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:-1)+tabButtons.length)%tabButtons.length;tabButtons[next].focus();activateGame(tabButtons[next].dataset.tab)})});
const setText=(s,v)=>{const e=$(s);if(e&&e.textContent!==String(v))e.textContent=String(v)};
const bi=(ms,en)=>tr(ms,en);const RSTEP=1/120,TSTEP=1/120;
function rr(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);c.fill();c.stroke()}
function gameFocus(on){document.body.classList.toggle('game-running',on);if(on)cancelAnimationFrame(ambient.raf);else drawAmbient()}
let soundOn=false;function audioBeep(freq,d=.08,type='square'){if(!soundOn)return;try{const ac=(audioBeep.ctx??=new AudioContext());if(ac.state==='suspended')ac.resume();const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.03,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch{}}
/* ============ GAME 01 \u2014 UpcycleVelocity (V10) ============
   Logic upgrades over V9:
   \u2022 Air boost is a limited resource (max 3), refilled by canisters and checkpoints.
   \u2022 Litter drones patrol and can be stomped (recycled) instead of only hurting you.
   \u2022 Crumbling cardboard ledges and bale springs make routes deliberate.
   \u2022 Tokens are sorted by material; three different types in a row = sorted-set bonus.
   \u2022 The gate is a solid door that physically opens once the quota is met.        */
const runCanvas=$('#run-canvas'),rctx=runCanvas.getContext('2d',{alpha:false}),RW=1000,RH=500,PW=36,PH=50,GY=420,RUN_MAX_BOOST=3;
const P=(x,y,w,type='solid')=>({x,y,w,type}),H=(x,w=64,y=GY)=>({x,y,w}),K=(x,y,t=0)=>({x,y,t}),
	M=(x1,x2,y,speed=70)=>({x1,x2,y,speed}),C=(x,sx,sy=368)=>({x,spawn:{x:sx,y:sy}}),A=(x,y)=>({x,y}),SP=(x,y=GY)=>({x,y});
const TOKEN_NAME=[['Kertas','Paper'],['Plastik','Plastic'],['Logam','Metal']];
const PWU=(x,y,t='speed')=>({x,y,t,got:false});
const RUN_LEVELS=[
{name:['Laman Sekolah','Schoolyard Start'],world:2700,goal:2540,time:70,required:6,spawn:{x:80,y:368},
	plats:[P(0,GY,620),P(760,GY,520),P(1400,GY,520),P(2060,GY,540),P(300,330,190),P(900,320,180),P(1560,325,185),P(1840,255,160)],
	hazards:[H(500),H(1150),H(1980)],movers:[M(800,1180,388,74)],springs:[],
	tokens:[K(160,374,0),K(380,284,1),K(850,374,2),K(960,274,0),K(1480,374,1),K(1620,279,2),K(1890,209,0),K(2200,374,1)],
	cans:[A(1000,236),A(2120,372)],powerups:[PWU(500,280,'speed'),PWU(1850,200,'shield')],checkpoints:[C(800,790),C(1450,1440),C(2100,2090)]},
{name:['Laluan Botol','Bottleworks'],world:3000,goal:2860,time:76,required:7,spawn:{x:72,y:368},
	plats:[P(0,GY,560),P(700,GY,460),P(1240,GY,440),P(1800,GY,470),P(2380,GY,560),P(300,325,170),P(760,315,175),P(1320,300,170),P(1560,235,150),P(1880,320,175),P(2420,305,180),P(2650,240,160)],
	hazards:[H(430),H(880),H(1380),H(1960),H(2520)],movers:[M(720,1120,388,86),M(1820,2180,388,96)],springs:[SP(1180),SP(2300)],
	tokens:[K(150,374,1),K(360,279,0),K(820,374,2),K(830,269,1),K(1380,254,0),K(1620,189,2),K(1860,374,1),K(1950,274,0),K(2470,259,2),K(2700,194,1)],
	cans:[A(1140,372),A(2260,372)],powerups:[PWU(780,260,'jump'),PWU(2440,250,'shield')],checkpoints:[C(720,710),C(1260,1250),C(1820,1810),C(2400,2390)]},
{name:['Bumbung Kertas','Paper Rooftops'],world:3300,goal:3150,time:82,required:8,spawn:{x:60,y:368},
	plats:[P(0,GY,520),P(660,GY,420),P(1200,GY,400),P(1720,GY,420),P(2260,GY,420),P(2800,GY,500),
		P(260,320,160),P(700,310,165),P(960,240,150,'crumble'),P(1260,305,165),P(1520,235,150,'crumble'),P(1820,300,170),P(2080,225,150),P(2380,300,165),P(2860,250,170)],
	hazards:[H(400),H(780),H(1320),H(1860),H(2400),H(2960)],movers:[M(680,1060,388,96),M(1740,2100,388,104),M(2300,2640,388,112)],springs:[SP(1140),SP(2220)],
	tokens:[K(320,274,2),K(720,374,0),K(760,264,1),K(1010,194,2),K(1280,259,0),K(1580,189,1),K(1880,254,2),K(2130,179,0),K(2430,254,1),K(2900,204,2),K(3000,374,0)],
	cans:[A(1100,372),A(2190,372),A(2860,206)],powerups:[PWU(980,180,'speed'),PWU(2100,170,'jump')],checkpoints:[C(680,670),C(1220,1210),C(1740,1730),C(2280,2270),C(2820,2810)]},
{name:['Pusat Pengasingan','Sorting Hub'],world:3600,goal:3450,time:88,required:9,spawn:{x:72,y:368},
	plats:[P(0,GY,500),P(640,GY,400),P(1160,GY,400),P(1680,GY,400),P(2200,GY,400),P(2720,GY,400),P(3240,GY,460),
		P(250,315,155),P(680,300,160),P(920,230,145,'crumble'),P(1220,300,160),P(1470,225,145,'crumble'),P(1740,295,160),P(2000,220,145),P(2260,295,160),P(2520,220,145,'crumble'),P(2780,290,165),P(3280,245,170)],
	hazards:[H(380),H(760),H(1280),H(1800),H(2320),H(2840),H(3380)],
	movers:[M(660,1020,388,104),M(1180,1540,388,112),M(2220,2560,388,120),M(2740,3100,388,128)],springs:[SP(1100),SP(2160),SP(3200)],
	tokens:[K(140,374,0),K(310,269,1),K(700,254,2),K(970,184,0),K(1240,254,1),K(1520,179,2),K(1790,249,0),K(2050,174,1),K(2310,249,2),K(2570,174,0),K(2830,244,1),K(3330,199,2),K(3400,374,0)],
	cans:[A(1060,372),A(2120,372),A(3160,372)],powerups:[PWU(1490,175,'shield'),PWU(2540,170,'speed')],checkpoints:[C(660,650),C(1180,1170),C(1700,1690),C(2220,2210),C(2740,2730),C(3260,3250)]},
{name:['Sektor Plastik','Plastic Sector'],world:4000,goal:3800,time:95,required:10,spawn:{x:70,y:368},
	plats:[P(0,GY,450),P(600,GY,380),P(1120,GY,380),P(1650,GY,380),P(2200,GY,380),P(2750,GY,380),P(3300,GY,500),
		P(220,310,150),P(650,290,150,'crumble'),P(900,220,140,'crumble'),P(1180,290,150),P(1450,215,140,'crumble'),P(1750,285,150),P(2020,210,140,'crumble'),P(2300,285,150),P(2580,210,140,'crumble'),P(2850,280,150),P(3350,230,160)],
	hazards:[H(350),H(720),H(1220),H(1780),H(2320),H(2880),H(3450)],
	movers:[M(600,980,388,115),M(1150,1520,388,125),M(2200,2580,388,135),M(2750,3150,388,145)],springs:[SP(1080),SP(2150),SP(3250)],
	tokens:[K(150,374,1),K(320,260,0),K(670,240,2),K(920,170,1),K(1200,240,0),K(1480,165,2),K(1780,235,1),K(2050,160,0),K(2330,235,2),K(2600,160,1),K(2880,230,0),K(3400,180,2)],
	cans:[A(1000,372),A(2100,372),A(3200,372)],powerups:[PWU(670,240,'jump'),PWU(2050,160,'shield'),PWU(2880,230,'speed')],checkpoints:[C(600,580),C(1120,1100),C(1650,1630),C(2200,2180),C(2750,2730),C(3300,3280)]},
{name:['Kilang Logam','Metal Foundry'],world:4500,goal:4300,time:100,required:11,spawn:{x:70,y:368},
	plats:[P(0,GY,420),P(580,GY,360),P(1100,GY,360),P(1650,GY,360),P(2200,GY,360),P(2780,GY,360),P(3350,GY,360),P(3900,GY,450),
		P(200,305,145),P(620,285,145,'crumble'),P(880,215,135,'crumble'),P(1150,285,145),P(1420,210,135,'crumble'),P(1720,280,145),P(2000,205,135,'crumble'),P(2280,280,145),P(2560,205,135,'crumble'),P(2850,275,145),P(3120,200,135,'crumble'),P(3400,275,145),P(3950,225,155)],
	hazards:[H(320),H(700),H(1200),H(1750),H(2300),H(2880),H(3450),H(4000)],
	movers:[M(580,950,388,130),M(1100,1500,388,140),M(2200,2600,388,150),M(2780,3200,388,160),M(3350,3750,388,170)],springs:[SP(1050),SP(2150),SP(3300)],
	tokens:[K(140,374,2),K(300,255,1),K(640,235,0),K(900,165,2),K(1170,235,1),K(1450,160,0),K(1750,230,2),K(2030,155,1),K(2310,230,0),K(2590,155,2),K(2880,225,1),K(3150,150,0),K(3430,225,2),K(4000,175,1)],
	cans:[A(950,372),A(2050,372),A(3150,372)],powerups:[PWU(900,165,'speed'),PWU(2030,155,'shield'),PWU(3150,150,'jump')],checkpoints:[C(580,560),C(1100,1080),C(1650,1630),C(2200,2180),C(2780,2760),C(3350,3330),C(3900,3880)]},
{name:['Gudang Kaca','Glass Warehouse'],world:5000,goal:4800,time:110,required:12,spawn:{x:70,y:368},
	plats:[P(0,GY,400),P(560,GY,340),P(1080,GY,340),P(1620,GY,340),P(2180,GY,340),P(2740,GY,340),P(3300,GY,340),P(3860,GY,340),P(4420,GY,440),
		P(180,300,140),P(600,280,140,'crumble'),P(860,210,130,'crumble'),P(1120,280,140),P(1390,205,130,'crumble'),P(1690,275,140),P(1960,200,130,'crumble'),P(2240,275,140),P(2520,200,130,'crumble'),P(2800,270,140),P(3080,195,130,'crumble'),P(3360,270,140),P(3640,195,130,'crumble'),P(3920,270,140),P(4470,220,150)],
	hazards:[H(300),H(680),H(1180),H(1720),H(2280),H(2840),H(3400),H(3960),H(4500)],
	movers:[M(560,920,388,140),M(1080,1480,388,150),M(2180,2580,388,160),M(2740,3150,388,170),M(3860,4280,388,180)],springs:[SP(1020),SP(2120),SP(3240),SP(4360)],
	tokens:[K(130,374,0),K(280,250,2),K(620,230,1),K(880,160,0),K(1140,230,2),K(1410,155,1),K(1710,225,0),K(1990,150,2),K(2270,225,1),K(2550,150,0),K(2830,220,2),K(3110,145,1),K(3390,220,0),K(3670,145,2),K(3950,220,1),K(4520,170,0)],
	cans:[A(900,372),A(2000,372),A(3100,372),A(4200,372)],powerups:[PWU(880,160,'shield'),PWU(1990,150,'speed'),PWU(3110,145,'jump'),PWU(3950,220,'shield')],checkpoints:[C(560,540),C(1080,1060),C(1620,1600),C(2180,2160),C(2740,2720),C(3300,3280),C(3860,3840),C(4420,4400)]},
{name:['Taman Teknologi','Tech Ecology Park'],world:5400,goal:5200,time:120,required:13,spawn:{x:70,y:368},
	plats:[P(0,GY,380),P(540,GY,320),P(1040,GY,320),P(1580,GY,320),P(2120,GY,320),P(2680,GY,320),P(3240,GY,320),P(3800,GY,320),P(4360,GY,320),P(4920,GY,420),
		P(160,295,135),P(580,275,135,'crumble'),P(840,205,125,'crumble'),P(1100,275,135),P(1360,200,125,'crumble'),P(1650,270,135),P(1920,195,125,'crumble'),P(2200,270,135),P(2480,195,125,'crumble'),P(2760,265,135),P(3040,190,125,'crumble'),P(3320,265,135),P(3600,190,125,'crumble'),P(3880,265,135),P(4160,190,125,'crumble'),P(4440,265,135),P(4970,215,145)],
	hazards:[H(280),H(650),H(1140),H(1680),H(2220),H(2780),H(3340),H(3900),H(4460),H(4900)],
	movers:[M(540,880,388,150),M(1040,1440,388,160),M(2120,2520,388,170),M(2680,3080,388,180),M(3800,4200,388,190)],springs:[SP(980),SP(2060),SP(3180),SP(4300)],
	tokens:[K(120,374,1),K(260,245,0),K(600,225,2),K(860,155,1),K(1120,225,0),K(1380,150,2),K(1670,220,1),K(1950,145,0),K(2230,220,2),K(2510,145,1),K(2790,215,0),K(3070,140,2),K(3350,215,1),K(3630,140,0),K(3910,215,2),K(4190,140,1),K(4470,215,0),K(5020,165,2)],
	cans:[A(850,372),A(1950,372),A(3050,372),A(4150,372)],powerups:[PWU(860,155,'speed'),PWU(1950,145,'jump'),PWU(3070,140,'shield'),PWU(4190,140,'speed')],checkpoints:[C(540,520),C(1040,1020),C(1580,1560),C(2120,2100),C(2680,2660),C(3240,3220),C(3800,3780),C(4360,4340),C(4920,4900)]},
{name:['Litar Dron','Drone Circuit'],world:5800,goal:5600,time:130,required:14,spawn:{x:70,y:368},
	plats:[P(0,GY,360),P(520,GY,300),P(1000,GY,300),P(1520,GY,300),P(2060,GY,300),P(2600,GY,300),P(3160,GY,300),P(3720,GY,300),P(4280,GY,300),P(4840,GY,300),P(5400,GY,400),
		P(150,290,130),P(560,270,130,'crumble'),P(820,200,120,'crumble'),P(1080,270,130),P(1340,195,120,'crumble'),P(1620,265,130),P(1890,190,120,'crumble'),P(2160,265,130),P(2430,190,120,'crumble'),P(2700,260,130),P(2970,185,120,'crumble'),P(3250,260,130),P(3520,185,120,'crumble'),P(3800,260,130),P(4070,185,120,'crumble'),P(4350,260,130),P(4620,185,120,'crumble'),P(4900,260,130),P(5450,210,140)],
	hazards:[H(260),H(620),H(1100),H(1620),H(2160),H(2700),H(3260),H(3820),H(4380),H(4940)],
	movers:[M(520,840,388,160),M(1000,1380,388,170),M(2060,2440,388,180),M(2600,2980,388,190),M(3720,4120,388,200),M(4280,4680,388,210)],springs:[SP(940),SP(2000),SP(3100),SP(4200)],
	tokens:[K(110,374,2),K(240,240,1),K(580,220,0),K(840,150,2),K(1100,220,1),K(1360,145,0),K(1640,215,2),K(1910,140,1),K(2180,215,0),K(2450,140,2),K(2730,210,1),K(3000,135,0),K(3280,210,2),K(3550,135,1),K(3830,210,0),K(4100,135,2),K(4380,210,1),K(4650,135,0),K(4930,210,2),K(5500,160,1)],
	cans:[A(800,372),A(1900,372),A(3000,372),A(4100,372),A(5200,372)],powerups:[PWU(840,150,'jump'),PWU(1910,140,'shield'),PWU(3000,135,'speed'),PWU(4100,135,'shield')],checkpoints:[C(520,500),C(1000,980),C(1520,1500),C(2060,2040),C(2600,2580),C(3160,3140),C(3720,3700),C(4280,4260),C(4840,4820),C(5400,5380)]},
{name:['Puncak Kitar Semula','Recycling Peak'],world:6200,goal:6000,time:140,required:15,spawn:{x:70,y:368},
	plats:[P(0,GY,340),P(500,GY,280),P(960,GY,280),P(1460,GY,280),P(1980,GY,280),P(2500,GY,280),P(3040,GY,280),P(3580,GY,280),P(4120,GY,280),P(4660,GY,280),P(5200,GY,280),P(5740,GY,380),
		P(140,285,125),P(540,265,125,'crumble'),P(800,195,115,'crumble'),P(1060,265,125),P(1320,190,115,'crumble'),P(1590,260,125),P(1860,185,115,'crumble'),P(2130,260,125),P(2400,185,115,'crumble'),P(2670,255,125),P(2940,180,115,'crumble'),P(3210,255,125),P(3480,180,115,'crumble'),P(3750,255,125),P(4020,180,115,'crumble'),P(4290,255,125),P(4560,180,115,'crumble'),P(4830,255,125),P(5100,180,115,'crumble'),P(5370,255,125),P(5790,205,135)],
	hazards:[H(240),H(590),H(1050),H(1550),H(2080),H(2600),H(3140),H(3680),H(4220),H(4760),H(5300)],
	movers:[M(500,800,388,170),M(960,1320,388,180),M(1980,2340,388,190),M(2500,2880,388,200),M(3580,3960,388,210),M(4120,4500,388,220),M(5200,5580,388,230)],springs:[SP(900),SP(1920),SP(2980),SP(4060),SP(5140)],
	tokens:[K(100,374,0),K(220,235,2),K(560,215,1),K(820,145,0),K(1080,215,2),K(1340,140,1),K(1610,210,0),K(1880,135,2),K(2150,210,1),K(2420,135,0),K(2690,205,2),K(2960,130,1),K(3230,205,0),K(3500,130,2),K(3770,205,1),K(4040,130,0),K(4310,205,2),K(4580,130,1),K(4850,205,0),K(5120,130,2),K(5390,205,1),K(5840,155,0)],
	cans:[A(750,372),A(1800,372),A(2850,372),A(3900,372),A(4950,372)],powerups:[PWU(820,145,'speed'),PWU(1880,135,'jump'),PWU(2960,130,'shield'),PWU(4040,130,'speed'),PWU(5120,130,'shield')],checkpoints:[C(500,480),C(960,940),C(1460,1440),C(1980,1960),C(2500,2480),C(3040,3020),C(3580,3560),C(4120,4100),C(4660,4640),C(5200,5180),C(5740,5720)]}];

let runState='idle',runLevelIndex=0,runLevel=RUN_LEVELS[0],runScore=0,runTime=70,runItems=0,runTotal=0,runLives=3,runName='',runWon=false;
let player={x:80,y:368,vx:0,vy:0,grounded:false,face:1},runKeys={left:false,right:false,jump:false};
let boost=RUN_MAX_BOOST,coyote=0,jumpBuffer=0,invincible=0,respawnTimer=0,checkpoint=0,gateOpen=0;
let pwrCans=[],powerups=[],pwrActive={speed:0,jump:0,shield:0};
let tokens=[],cans=[],movers=[],crumbles=[],runFx=[],runScene=null,camera=0,runClock=0,shake=0,sortSeq=[],comboPops=[];
let runMessage='',messageTime=0,runLast=0,runAcc=0,runRAF=0;
const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
function setRunOverlay(title,copy,label){setText('#run-overlay h3',title);setText('#run-overlay p:not(.mini-label)',copy);setText('#run-start',label);$('#run-overlay').classList.remove('hidden')}
function buildRunScene(){
	const s=document.createElement('canvas');s.width=runLevel.world+RW;s.height=RH;const c=s.getContext('2d');
	for(const p of runLevel.plats){if(p.type==='crumble')continue;
		const h=RH-p.y+60;c.fillStyle='#a9714a';c.strokeStyle='#133b32';c.lineWidth=3;rr(c,p.x,p.y,p.w,h,6);
		c.fillStyle='#d8f45f';c.fillRect(p.x+2,p.y+1,p.w-4,8);
		c.strokeStyle='rgba(19,59,50,.22)';c.lineWidth=2;
		for(let x=p.x+18;x<p.x+p.w-10;x+=34){c.beginPath();c.moveTo(x,p.y+16);c.lineTo(x,p.y+Math.min(h,54));c.stroke()}}
	for(const h of runLevel.hazards){c.fillStyle='#ed5d48';c.strokeStyle='#133b32';c.lineWidth=2;
		for(let i=0;i<3;i++){const x=h.x+i*h.w/3,w=h.w/3;c.beginPath();c.moveTo(x,h.y);c.lineTo(x+w/2,h.y-30);c.lineTo(x+w,h.y);c.closePath();c.fill();c.stroke()}}
	for(const sp of runLevel.springs){c.fillStyle='#46a171';c.strokeStyle='#133b32';c.lineWidth=3;rr(c,sp.x-30,sp.y-16,60,16,5);c.fillStyle='#133b32';c.font='700 12px Arial';c.textAlign='center';c.fillText('\u2191\u2191',sp.x,sp.y-4)}
	return s;
}
function loadRunLevel(i,keep=true){
	runLevelIndex=clamp(i,0,RUN_LEVELS.length-1);runLevel=RUN_LEVELS[runLevelIndex];
	if(!keep){runScore=0;runTotal=0;runWon=false}
	runTime=runLevel.time;runItems=0;runLives=3;checkpoint=0;boost=RUN_MAX_BOOST;gateOpen=0;sortSeq=[];
	tokens=runLevel.tokens.map((p,id)=>({...p,id,got:false}));
	cans=runLevel.cans.map(p=>({...p,got:false,timer:0}));
	powerups=(runLevel.powerups||[]).map(p=>({...p,got:false}));
	pwrActive={speed:0,jump:0,shield:0};
	movers=runLevel.movers.map(m=>({...m,x:m.x1,dir:1,w:36,h:30,dead:0}));
	crumbles=runLevel.plats.filter(p=>p.type==='crumble').map(p=>({...p,timer:0,state:'ok',respawn:0}));
	runFx=[];comboPops=[];camera=0;runClock=0;messageTime=0;respawnTimer=0;invincible=0;coyote=0;jumpBuffer=0;shake=0;
	player={...runLevel.spawn,vx:0,vy:0,grounded:false,face:1};
	runScene=buildRunScene();updateRunHUD();drawRun();
}
function updateRunHUD(){
	setText('#run-score',String(Math.round(runScore)).padStart(4,'0'));
	setText('#run-time',Math.max(0,Math.ceil(runTime)));
	setText('#run-items',`${runItems}/${runLevel.required}`);
	setText('#run-level',`${runLevelIndex+1}/${RUN_LEVELS.length}`);
	setText('#run-boost','\u25cf'.repeat(boost)+'\u25cb'.repeat(RUN_MAX_BOOST-boost));
	setText('#run-lives','\u2665'.repeat(Math.max(0,runLives)));
	const fill=$('#run-progress-fill');if(fill)fill.style.transform=`scaleX(${Math.min(1,runItems/runLevel.required)})`;
}
function startRun(){
	const n=requireName('#run-name');if(!n)return;runName=n;
	if(runState==='paused')runState='playing';
	else if(runState==='levelComplete'){loadRunLevel(runLevelIndex+1,true);runState='playing'}
	else{loadRunLevel(0,false);runState='playing'}
	$('#run-overlay').classList.add('hidden');$('#run-pause').disabled=false;setText('#run-pause',tr('Jeda','Pause'));
	runLast=performance.now();runAcc=0;cancelAnimationFrame(runRAF);runRAF=requestAnimationFrame(runLoop);gameFocus(true);
}
function pauseRun(){if(runState!=='playing')return;runState='paused';cancelAnimationFrame(runRAF);gameFocus(false);
	setRunOverlay(tr('Permainan dijeda','Game paused'),tr('Fizik dibekukan. Sambung apabila bersedia.','Physics frozen. Continue when ready.'),tr('SAMBUNG','CONTINUE'));setText('#run-pause',tr('Sambung','Continue'))}
function resetRun(){cancelAnimationFrame(runRAF);runState='idle';loadRunLevel(0,false);
	setRunOverlay('UpcycleVelocity',tr('Empat aras, boost udara terhad, dron sampah yang boleh dipijak dan pintu kilang yang hanya terbuka apabila kuota dipenuhi.','Four levels, limited air boosts, stompable litter drones and a plant gate that only opens when the quota is met.'),tr('MULA ARAS 1','START LEVEL 1'));
	$('#run-pause').disabled=true;gameFocus(false)}
function finishRun(win=false){
	if(runState==='ended')return;runState='ended';runWon=win;cancelAnimationFrame(runRAF);gameFocus(false);$('#run-pause').disabled=true;
	saveScore(runName,runScore,'UpcycleVelocity');if(runTotal>=24)unlockAchievement('collect');if(win)unlockAchievement('finisher');
	if(win)confetti();
	setRunOverlay(win?tr('Semua aras selesai!','All levels cleared!'):tr('Larian tamat','Run over'),`${tr('Skor','Score')}: ${Math.round(runScore)} \u2022 ${tr('Jumlah token','Total tokens')}: ${runTotal}`,tr('MAIN DARI AWAL','PLAY FROM START'));
}
function completeRunLevel(){
	const bonus=Math.ceil(runTime)*12+runLives*150+boost*60;runScore+=bonus;
	if(runLevelIndex===RUN_LEVELS.length-1){finishRun(true);return}
	runState='levelComplete';cancelAnimationFrame(runRAF);$('#run-pause').disabled=true;gameFocus(false);confetti();
	setRunOverlay(tr(`Aras ${runLevelIndex+1} selesai!`,`Level ${runLevelIndex+1} cleared!`),`${tr('Bonus','Bonus')}: ${bonus} (${tr('masa','time')} + ${tr('nyawa','lives')} + ${tr('boost','boost')})`,tr('ARAS SETERUSNYA','NEXT LEVEL'));
}
function runMsg(ms,en,d=1.4){runMessage=tr(ms,en);messageTime=d}
function pop(x,y,text,color='#d8f45f'){if(comboPops.length<10)comboPops.push({x,y,text,color,life:1})}
function queueJump(){if(runState==='playing'){jumpBuffer=.12;runKeys.jump=true}}
function releaseJump(){runKeys.jump=false;if(player.vy<-260)player.vy=-260}
function burst(x,y,color,n=8){const cap=lowPower?40:90;for(let i=0;i<n&&runFx.length<cap;i++)runFx.push({x,y,vx:(Math.random()-.5)*200,vy:-50-Math.random()*180,life:.5+Math.random()*.3,color,size:2+Math.random()*4})}
function spawnPoint(){return checkpoint?runLevel.checkpoints[checkpoint-1].spawn:runLevel.spawn}
function loseLife(reason){
	if(respawnTimer>0||invincible>0)return;
	if(reason!=='fall'&&pwrActive.shield>0){
		pwrActive.shield=0;invincible=1.2;shake=Math.max(shake,8);
		burst(player.x+PW/2,player.y+PH/2,'#ffc94a',20);audioBeep(800,.15);
		pop(player.x+PW/2,player.y,'SHIELD BROKEN','#ffc94a');
		runMsg('Perisai menyerap serangan!','Shield absorbed hit!',1.0);
		return;
	}runLives--;runScore=Math.max(0,runScore-120);sortSeq=[];shake=Math.max(shake,10);
	burst(player.x+PW/2,player.y+PH/2,'#ed5d48',16);audioBeep(145,.12,'sawtooth');
	if(runLives<=0){updateRunHUD();finishRun(false);return}
	player={...spawnPoint(),vx:0,vy:0,grounded:false,face:1};respawnTimer=.55;invincible=1.4;boost=Math.max(boost,1);
	runMsg(reason==='fall'?'Kembali ke zon selamat':'Kembali ke pusat pemeriksaan',reason==='fall'?'Returned to the safe zone':'Returned to the checkpoint');
	updateRunHUD();
}
function activePlats(){const list=runLevel.plats.filter(p=>p.type!=='crumble');for(const c of crumbles)if(c.state!=='gone')list.push(c);return list}
function updateRun(dt){
	if(runState!=='playing')return;
	runClock+=dt;runTime-=dt;shake=Math.max(0,shake-dt*28);
	if(runTime<=0){runTime=0;finishRun(false);return}
	invincible=Math.max(0,invincible-dt);messageTime=Math.max(0,messageTime-dt);
	pwrActive.speed=Math.max(0,pwrActive.speed-dt);
	pwrActive.jump=Math.max(0,pwrActive.jump-dt);
	pwrActive.shield=Math.max(0,pwrActive.shield-dt);
	for(const p of comboPops){p.life-=dt*1.3;p.y-=26*dt}
	comboPops=comboPops.filter(p=>p.life>0);
	for(const c of cans)if(c.got)c.timer=Math.max(0,c.timer-dt);
	for(const m of movers){
		if(m.dead>0){m.dead-=dt;continue}
		m.x+=m.dir*m.speed*dt;
		if(m.x<=m.x1){m.x=m.x1;m.dir=1}else if(m.x+m.w>=m.x2){m.x=m.x2-m.w;m.dir=-1}
	}
	for(const c of crumbles){
		if(c.state==='breaking'){c.timer-=dt;if(c.timer<=0){c.state='gone';c.respawn=3.4;burst(c.x+c.w/2,c.y+10,'#a9714a',12)}}
		else if(c.state==='gone'){c.respawn-=dt;if(c.respawn<=0){c.state='ok';c.timer=0}}
	}
	if(respawnTimer>0){respawnTimer-=dt;return}
	jumpBuffer=Math.max(0,jumpBuffer-dt);coyote=player.grounded?.1:Math.max(0,coyote-dt);
	const intent=(runKeys.right?1:0)-(runKeys.left?1:0),acc=player.grounded?2300:1450,friction=player.grounded?2700:520;
	const maxSpd=pwrActive.speed>0?520:355;
	if(intent){player.vx=clamp(player.vx+intent*acc*dt,-maxSpd,maxSpd);player.face=intent}
	else{const drag=friction*dt;player.vx=Math.abs(player.vx)<=drag?0:player.vx-Math.sign(player.vx)*drag}
	if(jumpBuffer>0){
		if(player.grounded||coyote>0){player.vy=pwrActive.jump>0?-760:-615;player.grounded=false;coyote=0;jumpBuffer=0;audioBeep(430);burst(player.x+PW/2,player.y+PH,'#fffaf0',6)}
		else if(boost>0){player.vy=-545;boost--;jumpBuffer=0;audioBeep(560);burst(player.x+PW/2,player.y+PH,'#6ed0d9',10);pop(player.x+PW/2,player.y,'BOOST','#6ed0d9');updateRunHUD()}
		else{jumpBuffer=0;runMsg('Boost udara habis \u2014 cari tin udara','Out of air boost \u2014 find an air can',.9)}
	}
	const prevBottom=player.y+PH;
	player.vy=Math.min(980,player.vy+1700*dt);
	player.x=clamp(player.x+player.vx*dt,0,runLevel.world-PW);
	player.y+=player.vy*dt;player.grounded=false;
	if(player.vy>=0){
		let land=null;
		for(const p of activePlats())if(player.x+PW-5>p.x&&player.x+5<p.x+p.w&&prevBottom<=p.y+1&&player.y+PH>=p.y&&(!land||p.y<land.y))land=p;
		if(land){
			player.y=land.y-PH;player.vy=0;player.grounded=true;
			if(land.type==='crumble'&&land.state==='ok'){land.state='breaking';land.timer=.65;runMsg('Ledge kadbod runtuh!','Cardboard ledge is collapsing!',.8)}
		}
	}
	if(player.grounded)for(const sp of runLevel.springs)
		if(Math.abs(player.y+PH-sp.y)<4&&player.x+PW>sp.x-30&&player.x<sp.x+30){player.vy=-880;player.grounded=false;audioBeep(680);burst(sp.x,sp.y,'#46a171',12);pop(sp.x,sp.y-40,'\u2191 BALE','#46a171')}
	if(player.y>RH+90){loseLife('fall');return}
	const body={x:player.x+5,y:player.y+6,w:PW-10,h:PH-6};
	for(const m of movers){
		if(m.dead>0)continue;
		const box={x:m.x,y:m.y-m.h,w:m.w,h:m.h};
		if(!hit(body,box))continue;
		if(player.vy>60&&prevBottom<=box.y+10){m.dead=4;player.vy=-470;runScore+=90;shake=Math.max(shake,6);audioBeep(600);burst(m.x+m.w/2,m.y-14,'#ffc94a',14);pop(m.x+m.w/2,m.y-50,'+90 \u267b')}
		else if(invincible<=0){loseLife('drone');return}
	}
	if(invincible<=0)for(const h of runLevel.hazards)if(hit(body,{x:h.x+4,y:h.y-26,w:h.w-8,h:26})){loseLife('hazard');return}
	for(let i=checkpoint;i<runLevel.checkpoints.length;i++){
		if(player.x>=runLevel.checkpoints[i].x){checkpoint=i+1;runScore+=75;boost=Math.min(RUN_MAX_BOOST,boost+1);runMsg('Pusat pemeriksaan \u2022 +1 boost','Checkpoint \u2022 +1 boost');audioBeep(610);updateRunHUD()}else break;
	}
	const centre={x:player.x+PW/2,y:player.y+PH/2};
	for(const c of cans)if(!c.got&&Math.hypot(centre.x-c.x,centre.y-c.y)<34){
		c.got=true;c.timer=.6;boost=Math.min(RUN_MAX_BOOST,boost+1);runScore+=45;audioBeep(720);burst(c.x,c.y,'#6ed0d9',10);pop(c.x,c.y-30,'+1 BOOST','#6ed0d9');updateRunHUD();
	}
	for(const pw of powerups)if(!pw.got&&Math.hypot(centre.x-pw.x,centre.y-pw.y)<36){
		pw.got=true;runScore+=100;audioBeep(920);
		if(pw.t==='speed'){pwrActive.speed=9.0;pop(pw.x,pw.y-30,'SPEED BOOST ⚡','#ffc94a');runMsg('Power-up Kelajuan Diaktifkan!','Speed Boost Activated!',1.2)}
		else if(pw.t==='jump'){pwrActive.jump=9.0;pop(pw.x,pw.y-30,'JUMP BOOST 🦘','#d8f45f');runMsg('Power-up Lompatan Diaktifkan!','Super Jump Activated!',1.2)}
		else if(pw.t==='shield'){pwrActive.shield=12.0;pop(pw.x,pw.y-30,'SHIELD 🛡️','#6ed0d9');runMsg('Perisai Pelindung Diaktifkan!','Shield Activated!',1.2)}
		burst(pw.x,pw.y,'#ffc94a',16);updateRunHUD();
	}
	for(const p of tokens)if(!p.got&&Math.hypot(centre.x-p.x,centre.y-p.y)<34){
		p.got=true;runItems++;runTotal++;
		let gain=120+Math.ceil(runTime*1.5);
		sortSeq.push(p.t);if(sortSeq.length>3)sortSeq.shift();
		if(sortSeq.length===3&&new Set(sortSeq).size===3){gain+=250;sortSeq=[];runMsg('Set diasingkan! +250','Sorted set! +250',1.1);pop(p.x,p.y-42,'SET +250','#ffc94a');audioBeep(880)}
		else pop(p.x,p.y-36,`+${gain}`);
		runScore+=gain;burst(p.x,p.y,['#d8f45f','#6ed0d9','#ffc94a'][p.t],10);audioBeep(700+p.t*60);updateRunHUD();
	}
	const gateX=runLevel.goal,quota=runItems>=runLevel.required;
	gateOpen=clamp(gateOpen+(quota?dt*2.4:-dt*3),0,1);
	if(!quota&&player.x+PW>gateX){player.x=gateX-PW;if(player.vx>0)player.vx=0;
		if(messageTime<=0){const left=runLevel.required-runItems;runMsg(`Pintu berkunci \u2014 kumpul ${left} token lagi`,`Gate locked \u2014 collect ${left} more token${left===1?'':'s'}`,1.2);audioBeep(190,.1,'sawtooth')}}
	if(quota&&gateOpen>=1&&player.x+PW>=gateX+20){completeRunLevel();return}
	for(const p of runFx){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=430*dt;p.life-=dt}
	runFx=runFx.filter(p=>p.life>0);
	const target=clamp(player.x-340+player.vx*.28,0,runLevel.world-RW+80);
	camera+=(target-camera)*Math.min(1,dt*6.5);
	updateRunHUD();
}
function drawSky(){
	const g=rctx.createLinearGradient(0,0,0,RH);g.addColorStop(0,'#7fd0dc');g.addColorStop(.55,'#c9e8c6');g.addColorStop(1,'#efd8a6');
	rctx.fillStyle=g;rctx.fillRect(0,0,RW,RH);
	rctx.globalAlpha=.5;rctx.fillStyle='#ffffff';
	for(let i=0;i<6;i++){const x=((i*260-camera*.18-runClock*6)%1420+1420)%1420-160,y=58+(i%3)*44;
		rctx.beginPath();rctx.ellipse(x,y,58,17,0,0,Math.PI*2);rctx.fill();rctx.beginPath();rctx.ellipse(x+34,y+7,40,13,0,0,Math.PI*2);rctx.fill()}
	rctx.globalAlpha=1;
	rctx.fillStyle='#93c4a0';rctx.beginPath();rctx.moveTo(0,RH);
	for(let x=0;x<=RW;x+=40)rctx.lineTo(x,300+Math.sin((x+camera*.25)*.006)*40);
	rctx.lineTo(RW,RH);rctx.fill();
	rctx.fillStyle='#6fa87d';
	for(let i=0;i<9;i++){const x=((i*210-camera*.45)%1900+1900)%1900-200,h=70+(i%4)*30;
		rctx.fillRect(x,392-h,86,h);rctx.fillStyle='rgba(255,255,255,.35)';
		for(let r=0;r<Math.floor(h/26);r++)rctx.fillRect(x+12,398-h+r*26,16,12);
		rctx.fillStyle='#6fa87d'}
	rctx.fillStyle='#72a878';rctx.beginPath();rctx.moveTo(0,RH);
	for(let x=0;x<=RW;x+=40)rctx.lineTo(x,372+Math.sin((x+camera*.7)*.009)*14);
	rctx.lineTo(RW,RH);rctx.fill();
}
function drawRun(){
	rctx.save();
	if(shake>0)rctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
	drawSky();
	const cam=Math.floor(camera);
	if(runScene)rctx.drawImage(runScene,cam,0,RW,RH,0,0,RW,RH);
	for(const c of crumbles){
		if(c.state==='gone')continue;const x=c.x-cam;if(x<-260||x>RW+40)continue;
		const sh=c.state==='breaking'?Math.sin(runClock*46)*3:0;
		rctx.fillStyle=c.state==='breaking'?'#c98a5e':'#b8794c';rctx.strokeStyle='#133b32';rctx.lineWidth=3;
		rr(rctx,x+sh,c.y,c.w,18,5);
		rctx.strokeStyle='rgba(19,59,50,.45)';rctx.lineWidth=2;rctx.beginPath();
		for(let i=1;i<4;i++){rctx.moveTo(x+sh+c.w*i/4,c.y+3);rctx.lineTo(x+sh+c.w*i/4-4,c.y+15)}rctx.stroke();
	}
	for(let i=0;i<runLevel.checkpoints.length;i++){
		const cp=runLevel.checkpoints[i],x=cp.x-cam;if(x<-40||x>RW+40)continue;
		rctx.strokeStyle='#133b32';rctx.lineWidth=4;rctx.beginPath();rctx.moveTo(x,GY);rctx.lineTo(x,340);rctx.stroke();
		const on=i<checkpoint,wave=on?Math.sin(runClock*4+i)*4:0;
		rctx.fillStyle=on?'#d8f45f':'#fffaf0';rctx.beginPath();rctx.moveTo(x,340);rctx.lineTo(x+42,354+wave);rctx.lineTo(x,368);rctx.closePath();rctx.fill();rctx.stroke();
	}
	for(const m of movers){
		if(m.dead>0)continue;const x=m.x-cam;if(x<-60||x>RW+60)continue;
		const bob=Math.sin(runClock*6+m.x1)*3;
		rctx.fillStyle='#6b5f8f';rctx.strokeStyle='#133b32';rctx.lineWidth=3;rr(rctx,x,m.y-m.h+bob,m.w,m.h,7);
		rctx.fillStyle='#ed5d48';rctx.fillRect(x+7,m.y-m.h+8+bob,6,6);rctx.fillRect(x+m.w-13,m.y-m.h+8+bob,6,6);
		rctx.fillStyle='rgba(19,59,50,.2)';rctx.beginPath();rctx.ellipse(x+m.w/2,m.y+4,m.w*.45,4,0,0,Math.PI*2);rctx.fill();
	}
	for(const c of cans){
		if(c.got)continue;const x=c.x-cam;if(x<-30||x>RW+30)continue;
		rctx.save();rctx.translate(x,c.y+Math.sin(runClock*4.5)*4);
		rctx.fillStyle='#6ed0d9';rctx.strokeStyle='#133b32';rctx.lineWidth=3;rr(rctx,-11,-17,22,34,7);
		rctx.fillStyle='#133b32';rctx.font='700 14px Arial';rctx.textAlign='center';rctx.fillText('\u2191',0,5);rctx.restore();
	}
	for(const p of tokens){
		if(p.got)continue;const x=p.x-cam;if(x<-30||x>RW+30)continue;
		rctx.save();rctx.translate(x,p.y+Math.sin(runClock*5+p.id)*4);rctx.rotate(Math.sin(runClock*2+p.id)*.09);
		rctx.fillStyle=['#d8f45f','#6ed0d9','#ffc94a'][p.t];rctx.strokeStyle='#133b32';rctx.lineWidth=3;rr(rctx,-17,-20,34,40,8);
		rctx.fillStyle='#133b32';rctx.font='700 18px Arial';rctx.textAlign='center';rctx.fillText('\u267b',0,7);rctx.restore();
	}
	const gx=runLevel.goal-cam;
	if(gx>-120&&gx<RW+120){
		const open=gateOpen,h=96,y=GY-h;
		rctx.fillStyle='#2c584c';rctx.strokeStyle='#133b32';rctx.lineWidth=4;rr(rctx,gx-8,y-26,80,26,6);
		rctx.fillStyle='#fffaf0';rctx.font='900 11px Arial';rctx.textAlign='center';rctx.fillText(tr('KILANG','PLANT'),gx+32,y-9);
		rctx.fillStyle=open>=1?'#d8f45f':'#ed5d48';rctx.strokeStyle='#133b32';rctx.lineWidth=4;
		rr(rctx,gx,y+h*open,64,h*(1-open)||1,5);
		if(open<1){rctx.fillStyle='#133b32';rctx.font='900 11px Arial';rctx.fillText(`${runItems}/${runLevel.required}`,gx+32,y+h*open+26)}
	}
	const px=player.x-cam,py=player.y;
	rctx.globalAlpha=invincible>0&&Math.floor(invincible*13)%2?.34:1;
	if(player.grounded&&Math.abs(player.vx)>60&&Math.floor(runClock*22)%2)burst(player.x+PW/2,player.y+PH-2,'#d9cdb0',1);
	if(pwrActive.shield>0){
		rctx.save();rctx.strokeStyle='#6ed0d9';rctx.lineWidth=4;rctx.beginPath();
		rctx.arc(px+PW/2,py+PH/2,32+Math.sin(runClock*12)*3,0,Math.PI*2);rctx.stroke();rctx.restore();
	}
	if(pwrActive.speed>0){
		rctx.fillStyle='#ffc94a';rctx.globalAlpha=0.4;
		rr(rctx,px-(player.face*12),py,PW,PH,9);rctx.globalAlpha=1;
	}
	rctx.fillStyle=pwrActive.jump>0?'#d8f45f':(pwrActive.speed>0?'#ffc94a':'#f27a3b');rctx.strokeStyle='#133b32';rctx.lineWidth=3;rr(rctx,px,py,PW,PH,9);
	rctx.fillStyle='#fffaf0';rr(rctx,px+6,py+10,PW-12,16,4);
	rctx.fillStyle='#133b32';rctx.fillRect(px+(player.face>0?12:9),py+15,5,5);rctx.fillRect(px+(player.face>0?22:19),py+15,5,5);
	rctx.fillStyle='#133b32';rctx.fillRect(px+7,py+PH-8,8,6);rctx.fillRect(px+PW-15,py+PH-8,8,6);
	rctx.globalAlpha=1;
	for(const p of runFx){rctx.globalAlpha=clamp(p.life*2,0,1);rctx.fillStyle=p.color;rctx.fillRect(p.x-cam,p.y,p.size,p.size)}
	rctx.globalAlpha=1;
	for(const p of comboPops){rctx.globalAlpha=clamp(p.life,0,1);rctx.fillStyle=p.color;rctx.font='900 17px Arial';rctx.textAlign='center';rctx.fillText(p.text,p.x-cam,p.y)}
	rctx.globalAlpha=1;
	rctx.fillStyle='rgba(7,30,26,.86)';rctx.fillRect(0,0,RW,46);
	rctx.fillStyle='#fffaf0';rctx.font='900 16px Arial';rctx.textAlign='left';
	rctx.fillText(`${tr('ARAS','LEVEL')} ${runLevelIndex+1}/${RUN_LEVELS.length} \u00b7 ${pick(runLevel.name)}`,20,29);
	rctx.textAlign='center';rctx.fillStyle='#6ed0d9';
	rctx.fillText(`${tr('BOOST','BOOST')} ${'\u25cf'.repeat(boost)}${'\u25cb'.repeat(RUN_MAX_BOOST-boost)}`,RW/2,29);
	rctx.fillStyle='#d8f45f';rctx.textAlign='right';rctx.fillText(`${'\u2665'.repeat(Math.max(0,runLives))}${'\u2661'.repeat(Math.max(0,3-runLives))}`,RW-20,29);
	if(messageTime>0){
		rctx.globalAlpha=Math.min(1,messageTime*2.2);
		rctx.fillStyle='rgba(255,250,240,.95)';rctx.strokeStyle='#133b32';rctx.lineWidth=3;rr(rctx,RW/2-230,60,460,44,10);
		rctx.fillStyle='#133b32';rctx.font='800 15px Arial';rctx.textAlign='center';rctx.fillText(runMessage,RW/2,88);rctx.globalAlpha=1;
	}
	rctx.restore();
}
function runLoop(now){
	if(runState!=='playing')return;
	runAcc+=Math.min(.05,Math.max(0,(now-runLast)/1000));runLast=now;
	let n=0;while(runAcc>=RSTEP&&n<7&&runState==='playing'){updateRun(RSTEP);runAcc-=RSTEP;n++}
	if(n===7)runAcc=0;
	drawRun();
	if(runState==='playing')runRAF=requestAnimationFrame(runLoop);
}
$('#run-start').addEventListener('click',startRun);
$('#run-pause').addEventListener('click',()=>runState==='paused'?startRun():pauseRun());
$('#run-reset').addEventListener('click',resetRun);
$('#sound-button').addEventListener('click',()=>{soundOn=!soundOn;$('#sound-button').setAttribute('aria-pressed',String(soundOn));refreshGameLanguage();toast(tr(`Bunyi: ${soundOn?'HIDUP':'MATI'}`,`Sound: ${soundOn?'ON':'OFF'}`));audioBeep(510)});
/* ============ GAME 02 \u2014 Recycle Rush (V10) ============
   Logic upgrades over V9:
   \u2022 A real conveyor belt: items travel and must be sorted before they fall off the end.
   \u2022 Only the front item can be sorted \u2014 pressure comes from the belt, not a stopwatch.
   \u2022 3 lives instead of a raw timer, so a mistake is a consequence you can read.
   \u2022 New LANDFILL bin with genuinely contaminated items (a greasy pizza box is not paper).
   \u2022 Sorting early pays more than sorting late, and every wrong answer explains why. */
const WASTE=[
	{icon:'\ud83d\udcf0',bin:'paper',name:['Surat khabar lama','Old newspaper'],why:['Kertas bersih dan kering \u2014 boleh dipulpa semula.','Clean, dry paper \u2014 it can be re-pulped.']},
	{icon:'\ud83d\udce6',bin:'paper',name:['Kotak kadbod','Cardboard box'],why:['Ratakan dahulu supaya muat dalam tong kertas.','Flatten it first so it fits the paper stream.']},
	{icon:'\ud83d\udcc4',bin:'paper',name:['Kertas latihan','Worksheet paper'],why:['Kertas pejabat ialah kertas bermutu tinggi.','Office paper is high-grade recyclable paper.']},
	{icon:'\ud83e\uddf4',bin:'plastic',name:['Botol plastik','Plastic bottle'],why:['PET \u2014 bilas dan buang penutup sebelum dikitar.','PET \u2014 rinse it and remove the cap before recycling.']},
	{icon:'\ud83e\udd64',bin:'plastic',name:['Cawan plastik','Plastic cup'],why:['Plastik keras boleh dikitar jika bersih.','Rigid plastic is recyclable when clean.']},
	{icon:'\ud83d\udecd\ufe0f',bin:'plastic',name:['Beg plastik','Plastic bag'],why:['Filem plastik \u2014 kumpul berasingan, jangan campur kertas.','Plastic film \u2014 collect it separately, never with paper.']},
	{icon:'\ud83e\udd6b',bin:'metal',name:['Tin makanan','Food tin'],why:['Keluli boleh dikitar tanpa had kali.','Steel can be recycled endlessly.']},
	{icon:'\ud83e\udd64',bin:'metal',name:['Tin aluminium','Aluminium can'],why:['Aluminium menjimatkan 95% tenaga apabila dikitar.','Recycling aluminium saves 95% of the energy.']},
	{icon:'\ud83d\udd18',bin:'metal',name:['Penutup logam','Metal cap'],why:['Kecil tetapi logam \u2014 kumpul dalam tin sebelum dihantar.','Small but still metal \u2014 collect caps in a tin.']},
	{icon:'\ud83e\uded9',bin:'glass',name:['Balang kaca','Glass jar'],why:['Kaca dikitar mengikut warna \u2014 bilas dahulu.','Glass is sorted by colour \u2014 rinse it first.']},
	{icon:'\ud83c\udf7e',bin:'glass',name:['Botol kaca','Glass bottle'],why:['Kaca tidak hilang mutu walau dikitar berkali-kali.','Glass never loses quality when recycled.']},
	{icon:'\ud83c\udf55',bin:'landfill',name:['Kotak piza berminyak','Greasy pizza box'],why:['Minyak merosakkan pulpa kertas \u2014 ini sisa, bukan kertas.','Grease ruins paper pulp \u2014 this is waste, not paper.']},
	{icon:'\ud83e\uddfb',bin:'landfill',name:['Tisu terpakai','Used tissue'],why:['Gentian terlalu pendek dan tercemar untuk dikitar.','The fibres are too short and soiled to recycle.']},
	{icon:'\ud83c\udf6b',bin:'landfill',name:['Pembalut snek foil','Foil snack wrapper'],why:['Lapisan plastik + foil tidak boleh diasingkan.','Mixed plastic and foil layers cannot be separated.']},
	{icon:'\u2615',bin:'landfill',name:['Cawan seramik pecah','Broken ceramic mug'],why:['Seramik melebur berbeza daripada kaca \u2014 ia merosakkan kelompok.','Ceramic melts differently from glass and ruins the batch.']}];
const BIN_LABEL={paper:['KERTAS','PAPER'],plastic:['PLASTIK','PLASTIC'],metal:['LOGAM','METAL'],glass:['KACA','GLASS'],landfill:['SISA','LANDFILL']};
const ROUNDS=[
	{goal:6,bins:['paper','plastic'],speed:62,ramp:3,gap:1.4},
	{goal:8,bins:['paper','plastic','metal','glass'],speed:80,ramp:4,gap:1.2},
	{goal:10,bins:['paper','plastic','metal','glass','landfill'],speed:98,ramp:5,gap:1.05},
	{goal:12,bins:['paper','plastic','metal','glass','landfill'],speed:118,ramp:6,gap:0.9},
	{goal:15,bins:['paper','plastic','metal','glass','landfill'],speed:138,ramp:7,gap:0.8}];
const RUSH_LIVES=3;
let rushState='idle',rushRound=0,rushScore=0,rushCombo=0,rushBestCombo=0,rushLives=RUSH_LIVES,rushSorted=0,rushName='';
let beltItems=[],beltSpeed=58,beltEnd=900,rushBag=[],rushSpawnT=0,rushSeq=0,rushLast=0,rushRAF=0,rushTotal=0;
const beltEl=$('#rush-items'),beltTrack=$('#rush-belt');
function setRushOverlay(title,copy,label){setText('#rush-overlay h3',title);setText('#rush-overlay p:not(.mini-label)',copy);setText('#rush-start',label);$('#rush-overlay').classList.remove('hidden')}
function roundCfg(){return ROUNDS[Math.min(rushRound,ROUNDS.length-1)]}
function rushPool(){const b=roundCfg().bins;return WASTE.filter(w=>b.includes(w.bin))}
function refillBag(){
	const pool=rushPool();rushBag=[];
	for(const bin of roundCfg().bins){const same=pool.filter(w=>w.bin===bin);rushBag.push(same[Math.floor(Math.random()*same.length)])}
	for(let i=0;i<3;i++)rushBag.push(pool[Math.floor(Math.random()*pool.length)]);
	for(let i=rushBag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[rushBag[i],rushBag[j]]=[rushBag[j],rushBag[i]]}
}
function measureBelt(){if(beltTrack)beltEnd=Math.max(300,beltTrack.clientWidth-76)}
function spawnBeltItem(){
	if(!rushBag.length)refillBag();
	const w=rushBag.shift(),id=++rushSeq;
	const el=document.createElement('div');
	el.className='belt-item';el.dataset.id=String(id);el.dataset.itemBin=w.bin;
	el.innerHTML=`<span class="belt-icon">${w.icon}</span><span class="belt-name">${escapeHTML(pick(w.name))}</span>`;
	el.style.transform='translate3d(-90px,0,0)';
	beltEl&&beltEl.appendChild(el);
	beltItems.push({id,w,x:-90,el});
}
function frontItem(){return beltItems.length?beltItems[0]:null}
function updateRushBins(){
	const active=roundCfg().bins;
	$$('[data-bin]').forEach(b=>{
		const on=active.includes(b.dataset.bin);
		b.hidden=!on;b.disabled=!on;b.classList.toggle('locked',!on);
		const key=b.querySelector('.bin-key');if(key)key.textContent=on?String(active.indexOf(b.dataset.bin)+1):'';
		const label=b.querySelector('.bin-label');if(label)label.textContent=pick(BIN_LABEL[b.dataset.bin]||['','']);
	});
}
function updateRushHUD(){
	const cfg=roundCfg();
	setText('#rush-score',String(Math.round(rushScore)).padStart(4,'0'));
	setText('#rush-combo',`\u00d7${rushCombo}`);
	setText('#rush-round',`${Math.min(rushRound+1,ROUNDS.length)}/${ROUNDS.length}`);
	setText('#rush-lives','\u2665'.repeat(Math.max(0,rushLives))+'\u2661'.repeat(Math.max(0,RUSH_LIVES-rushLives)));
	setText('#rush-speed',`${Math.round(beltSpeed)} px/s`);
	setText('#rush-progress-text',`${rushSorted}/${cfg.goal}`);
	const fill=$('#rush-progress-fill');if(fill)fill.style.transform=`scaleX(${Math.min(1,rushSorted/cfg.goal)})`;
	const f=frontItem();
	setText('#waste-item',f?f.w.icon:'\u267b');
	setText('#rush-prompt',f?`${pick(f.w.name)} \u2014 ${tr('pilih tong yang betul','choose the correct bin')}`:tr('Menunggu bahan seterusnya\u2026','Waiting for the next item\u2026'));
}
function clearBelt(){beltItems.forEach(i=>i.el.remove());beltItems=[]}
function setupRushRound(reset=false){
	const cfg=roundCfg();
	if(reset){rushScore=0;rushCombo=0;rushBestCombo=0;rushTotal=0}
	rushSorted=0;rushLives=RUSH_LIVES;beltSpeed=cfg.speed;rushSpawnT=.35;
	clearBelt();refillBag();measureBelt();updateRushBins();updateRushHUD();
	setText('#rush-round-label',tr(`Pusingan ${rushRound+1}`,`Round ${rushRound+1}`));
}
function startRush(){
	const n=requireName('#rush-name');if(!n)return;rushName=n;
	if(rushState==='paused')rushState='playing';
	else if(rushState==='roundComplete'){rushRound=Math.min(rushRound+1,ROUNDS.length-1);setupRushRound(false);rushState='playing'}
	else{rushRound=0;setupRushRound(true);rushState='playing'}
	$('#rush-overlay').classList.add('hidden');$('#rush-pause').disabled=false;setText('#rush-pause',tr('Jeda','Pause'));
	beltTrack&&beltTrack.classList.add('running');
	rushLast=performance.now();cancelAnimationFrame(rushRAF);rushRAF=requestAnimationFrame(rushLoop);gameFocus(true);
}
function pauseRush(){if(rushState!=='playing')return;rushState='paused';cancelAnimationFrame(rushRAF);gameFocus(false);
	beltTrack&&beltTrack.classList.remove('running');
	setRushOverlay(tr('Talian dihentikan','Line stopped'),tr('Tali sawat berhenti. Tiada bahan hilang semasa dijeda.','The belt is stopped. Nothing is lost while paused.'),tr('SAMBUNG','CONTINUE'));
	setText('#rush-pause',tr('Sambung','Continue'))}
function resetRush(){
	cancelAnimationFrame(rushRAF);rushState='idle';rushRound=0;setupRushRound(true);gameFocus(false);
	beltTrack&&beltTrack.classList.remove('running');$('#rush-pause').disabled=true;
	setRushOverlay('Recycle Rush',tr('Bahan bergerak di atas tali sawat. Asingkan bahan hadapan sebelum ia jatuh di hujung \u2014 lebih awal, lebih banyak mata.','Items ride a live conveyor. Sort the front item before it drops off the end \u2014 the earlier you sort, the more you score.'),tr('MULA PUSINGAN 1','START ROUND 1'));
}
function rushFlash(cls){if(!beltTrack)return;beltTrack.classList.remove('good','bad');void beltTrack.offsetWidth;beltTrack.classList.add(cls);setTimeout(()=>beltTrack.classList.remove(cls),380)}
function finishRush(win){
	rushState='ended';cancelAnimationFrame(rushRAF);gameFocus(false);$('#rush-pause').disabled=true;
	beltTrack&&beltTrack.classList.remove('running');
	saveScore(rushName,rushScore,'Recycle Rush');
	if(rushBestCombo>=8)unlockAchievement('sort');
	if(win){unlockAchievement('sorter');confetti()}
	setRushOverlay(win?tr('Semua pusingan selesai!','All rounds cleared!'):tr('Talian tersekat','Line jammed'),
		`${tr('Skor','Score')}: ${Math.round(rushScore)} \u2022 ${tr('Kombo terbaik','Best combo')}: \u00d7${rushBestCombo} \u2022 ${tr('Diasingkan','Sorted')}: ${rushTotal}`,
		tr('MAIN DARI PUSINGAN 1','PLAY FROM ROUND 1'));
}
function completeRushRound(){
	const bonus=200+rushLives*120+rushBestCombo*25;rushScore+=bonus;
	if(rushRound>=ROUNDS.length-1){updateRushHUD();finishRush(true);return}
	rushState='roundComplete';cancelAnimationFrame(rushRAF);$('#rush-pause').disabled=true;gameFocus(false);
	beltTrack&&beltTrack.classList.remove('running');clearBelt();updateRushHUD();confetti();
	const next=ROUNDS[rushRound+1];
	setRushOverlay(tr(`Pusingan ${rushRound+1} selesai!`,`Round ${rushRound+1} cleared!`),
		`${tr('Bonus','Bonus')}: ${bonus} \u2022 ${tr('Seterusnya','Next')}: ${next.bins.length} ${tr('tong','bins')}, ${next.speed} px/s`,
		tr('PUSINGAN SETERUSNYA','NEXT ROUND'));
}
function rushLoseLife(message){
	rushLives--;rushCombo=0;rushFlash('bad');audioBeep(160,.14,'sawtooth');
	toast(message);updateRushHUD();
	if(rushLives<=0)finishRush(false);
}
function sortInto(bin){
	if(rushState!=='playing')return;
	const item=frontItem();if(!item)return;
	if(!roundCfg().bins.includes(bin))return;
	const progress=clamp(item.x/beltEnd,0,1);
	beltItems.shift();
	if(item.w.bin===bin){
		rushCombo++;rushBestCombo=Math.max(rushBestCombo,rushCombo);rushSorted++;rushTotal++;
		const early=Math.round(60*(1-progress)),gain=100+early+rushCombo*15;
		rushScore+=gain;beltSpeed+=roundCfg().ramp;
		item.el.classList.add('sorted');audioBeep(660+Math.min(6,rushCombo)*40);rushFlash('good');
		const binEl=$(`[data-bin="${bin}"]`);
		if(binEl){binEl.classList.add('pop');setTimeout(()=>binEl.classList.remove('pop'),320)}
		toast(`+${gain} \u2022 ${tr('awal','early')} +${early} \u2022 ${pick(item.w.why)}`);
		setTimeout(()=>item.el.remove(),340);
		if(rushSorted>=roundCfg().goal){updateRushHUD();completeRushRound();return}
	}else{
		item.el.classList.add('wrong');setTimeout(()=>item.el.remove(),400);
		rushScore=Math.max(0,rushScore-40);
		rushLoseLife(`\u2715 ${pick(item.w.name)} \u2192 ${pick(BIN_LABEL[item.w.bin])}. ${pick(item.w.why)}`);
		if(rushState!=='playing')return;
	}
	updateRushHUD();
}
function rushLoop(now){
	if(rushState!=='playing')return;
	const dt=Math.min(.05,Math.max(0,(now-rushLast)/1000));rushLast=now;
	rushSpawnT-=dt;
	const cfg=roundCfg();
	if(rushSpawnT<=0&&beltItems.length<5){spawnBeltItem();rushSpawnT=cfg.gap*(58/beltSpeed)+.25}
	for(const it of beltItems){it.x+=beltSpeed*dt;it.el.style.transform=`translate3d(${it.x.toFixed(1)}px,0,0)`;
		it.el.classList.toggle('urgent',it.x>beltEnd*.78)}
	const first=frontItem();
	if(first&&first.x>=beltEnd){
		beltItems.shift();first.el.classList.add('lost');setTimeout(()=>first.el.remove(),400);
		rushLoseLife(tr(`Terlepas: ${pick(first.w.name)} jatuh di hujung tali sawat`,`Missed: ${pick(first.w.name)} fell off the end of the belt`));
		if(rushState!=='playing')return;
	}
	updateRushHUD();
	rushRAF=requestAnimationFrame(rushLoop);
}
$$('[data-bin]').forEach(b=>b.addEventListener('click',()=>sortInto(b.dataset.bin)));
$('#rush-start').addEventListener('click',startRush);
$('#rush-pause').addEventListener('click',()=>rushState==='paused'?startRush():pauseRush());
$('#rush-reset').addEventListener('click',resetRush);
addEventListener('resize',()=>measureBelt());
/* ============ GAME 03 \u2014 Cardboard Tower (V10) ============
   Logic upgrades over V9:
   \u2022 Real centre-of-mass balance: every placed box shifts the tower's balance,
     and the tower topples when the load leaves the base footprint.
   \u2022 A balance meter shows the lean live, so collapses are readable, not random.
   \u2022 Wind is telegraphed before each drop and held constant during the fall.
   \u2022 A crane arm + swaying hook replaces the invisible \"moving box\".
   \u2022 Boxes need at least 30% support or they slide off instead of floating.   */
const towerCanvas=$('#tower-canvas'),tctx=towerCanvas.getContext('2d',{alpha:false}),TW=1000,TH=540,TGRAV=1850;
const TSTAGES=[
	{name:['Gudang Tenang','Calm Warehouse'],speed:220,sway:16,wind:0,sky:['#8cd5d6','#d9edc0']},
	{name:['Angin Petang','Afternoon Breeze'],speed:300,sway:30,wind:32,sky:['#78bfd1','#f5d595']},
	{name:['Badai Bumbung','Rooftop Storm'],speed:380,sway:45,wind:55,sky:['#526eaa','#eab77a']},
	{name:['Amaran Taufan','Gale Warning'],speed:450,sway:60,wind:75,sky:['#424874','#a685e2']},
	{name:['Puncak Ribut','Typhoon Peak'],speed:520,sway:75,wind:95,sky:['#2c003e','#fe346e']}];
const TBASE={x:330,y:492,w:340,h:30,color:'#805034'};
const TCOLORS=['#c4824d','#d29158','#b87745','#99613c','#a36e43'];
const TFLOORS=15,TLIVES=3;
let towerState='idle',towerScore=0,towerFloor=0,towerStreak=0,towerLives=TLIVES,towerName='',towerBest=+(storage.get(STORE.towerBest,0)||0);
let tboxes=[],tFalling=null,tDebris=[],tHookX=TW/2,tHookDir=1,tSwayT=0,tWind=0,tWindNext=0,tLean=0,tCam=0,tClock=0,tShake=0;
let towerMsg='',towerMsgT=0,tLast=0,tAcc=0,towerRAF=0,tStageIndex=0;
function tStage(){return TSTAGES[Math.min(TSTAGES.length-1,Math.floor(towerFloor/3))]}
function setTowerOverlay(title,copy,label){setText('#tower-overlay h3',title);setText('#tower-overlay p:not(.mini-label)',copy);setText('#tower-start',label);$('#tower-overlay').classList.remove('hidden')}
function towerTop(){return tboxes[tboxes.length-1]}
function nextWidth(){return towerFloor===0?200:Math.max(58,towerTop().w)}
function comLean(){
	const placed=tboxes.slice(1);
	if(!placed.length)return 0;
	let mass=0,mx=0;
	for(const b of placed){const m=b.w;mass+=m;mx+=m*(b.x+b.w/2)}
	const com=mx/mass,offset=com-(TBASE.x+TBASE.w/2),limit=TBASE.w/2*.92;
	return clamp(offset/limit,-1.6,1.6);
}
function updateTowerHUD(){
	setText('#tower-level',`${towerFloor}/${TFLOORS}`);
	setText('#tower-score',String(Math.round(towerScore)).padStart(4,'0'));
	setText('#tower-best',String(Math.round(towerBest)).padStart(4,'0'));
	setText('#tower-lives','\u2665'.repeat(Math.max(0,towerLives)));
	setText('#tower-stage',pick(tStage().name));
	const w=tWindNext;
	setText('#tower-wind',w===0?tr('TENANG','CALM'):`${w>0?'\u2192':'\u2190'} ${Math.abs(Math.round(w))}`);
	const meter=$('#tower-balance');
	if(meter){
		const pct=clamp(tLean,-1,1);
		meter.style.setProperty('--lean',pct.toFixed(3));
		meter.dataset.state=Math.abs(pct)>.8?'danger':Math.abs(pct)>.5?'warn':'ok';
		setText('#tower-balance-value',`${Math.round(Math.abs(pct)*100)}%`);
	}
}
function rollWind(){const s=tStage();tWindNext=s.wind?Math.round((Math.random()*2-1)*s.wind):0}
function resetTower(){
	cancelAnimationFrame(towerRAF);towerState='idle';towerScore=0;towerFloor=0;towerStreak=0;towerLives=TLIVES;
	tboxes=[{...TBASE}];tFalling=null;tDebris=[];tCam=0;tLean=0;tClock=0;tShake=0;towerMsgT=0;tHookX=TW/2;tHookDir=1;tSwayT=0;
	rollWind();updateTowerHUD();drawTower();
	setTowerOverlay('Cardboard Tower',tr('Meter imbangan menunjukkan pusat graviti menara. Angin diberitahu sebelum setiap jatuhan \u2014 tiada kejutan, hanya pengiraan.','The balance meter shows the tower\u2019s centre of gravity. Wind is announced before every drop \u2014 no surprises, just judgement.'),tr('MULA MEMBINA','START BUILDING'));
	$('#tower-pause').disabled=true;$('#tower-drop').disabled=true;gameFocus(false);
}
function startTower(){
	const n=requireName('#tower-name');if(!n)return;towerName=n;
	if(towerState==='paused')towerState='playing';
	else{towerScore=0;towerFloor=0;towerStreak=0;towerLives=TLIVES;tboxes=[{...TBASE}];tFalling=null;tDebris=[];tCam=0;tLean=0;towerMsgT=0;rollWind();towerState='playing'}
	$('#tower-overlay').classList.add('hidden');$('#tower-pause').disabled=false;$('#tower-drop').disabled=false;
	setText('#tower-pause',tr('Jeda','Pause'));updateTowerHUD();
	tLast=performance.now();tAcc=0;cancelAnimationFrame(towerRAF);towerRAF=requestAnimationFrame(towerLoop);gameFocus(true);
}
function pauseTower(){if(towerState!=='playing')return;towerState='paused';cancelAnimationFrame(towerRAF);gameFocus(false);$('#tower-drop').disabled=true;
	setTowerOverlay(tr('Dijeda','Paused'),tr('Kren dihentikan. Angin seterusnya masih sama.','The crane is stopped. The next gust is unchanged.'),tr('SAMBUNG','CONTINUE'));setText('#tower-pause',tr('Sambung','Continue'))}
function towerMessage(ms,en,d=1.5){towerMsg=tr(ms,en);towerMsgT=d}
function endTower(win){
	towerState='ended';cancelAnimationFrame(towerRAF);gameFocus(false);$('#tower-pause').disabled=true;$('#tower-drop').disabled=true;
	if(win){towerScore+=1500;confetti()}
	if(towerScore>towerBest){towerBest=Math.round(towerScore);storage.set(STORE.towerBest,towerBest)}
	saveScore(towerName,towerScore,'Cardboard Tower');
	if(towerFloor>=8)unlockAchievement('tower');
	if(win)unlockAchievement('architect');
	updateTowerHUD();
	setTowerOverlay(win?tr('Menara siap!','Tower complete!'):tr('Menara tumbang','Tower collapsed'),
		`${tr('Tingkat','Floors')}: ${towerFloor}/${TFLOORS} \u2022 ${tr('Skor','Score')}: ${Math.round(towerScore)}`,tr('BINA SEMULA','BUILD AGAIN'));
}
function dropBox(){
	if(towerState!=='playing'||tFalling)return;
	const w=nextWidth(),sway=Math.sin(tSwayT)*tStage().sway;
	tFalling={x:clamp(tHookX+sway-w/2,-120,TW+120),y:120,w,h:30,vx:tWindNext,vy:0,color:TCOLORS[towerFloor%TCOLORS.length]};
	tWind=tWindNext;audioBeep(330,.07);$('#tower-drop').disabled=true;
}
function settleBox(f){
	const top=towerTop(),ovL=Math.max(f.x,top.x),ovR=Math.min(f.x+f.w,top.x+top.w),ov=ovR-ovL;
	if(ov<f.w*.3){
		towerLives--;towerStreak=0;tShake=8;audioBeep(150,.14,'sawtooth');
		tDebris.push({x:f.x,y:top.y-f.h,w:f.w,h:f.h,vx:(f.x+f.w/2<top.x+top.w/2?-170:170),vy:-120,rot:0,vr:(Math.random()-.5)*7,color:f.color});
		towerMessage(`Kurang sokongan (${Math.round(Math.max(0,ov)/f.w*100)}%) \u2014 perlu 30%`,`Not enough support (${Math.round(Math.max(0,ov)/f.w*100)}%) \u2014 30% needed`,1.8);
		updateTowerHUD();
		if(towerLives<=0){endTower(false);return}
		rollWind();updateTowerHUD();$('#tower-drop').disabled=false;return;
	}
	const offset=(f.x+f.w/2)-(top.x+top.w/2),perfect=Math.abs(offset)<=6;
	const box=perfect?{x:top.x+(top.w-f.w)/2,y:top.y-f.h,w:f.w,h:f.h,color:f.color}:{x:ovL,y:top.y-f.h,w:ov,h:f.h,color:f.color};
	tboxes.push(box);towerFloor++;
	if(perfect){towerStreak++;towerScore+=250+towerStreak*60;towerMessage(`Tepat! Rangkaian \u00d7${towerStreak}`,`Perfect! Streak \u00d7${towerStreak}`);audioBeep(880);confetti(14)}
	else{towerStreak=0;towerScore+=90+Math.round(ov/2);towerMessage(`Dipangkas ${Math.round(f.w-ov)} px`,`Trimmed ${Math.round(f.w-ov)} px`,1.1);audioBeep(520)}
	tLean=comLean();tShake=Math.min(9,Math.abs(tLean)*7);
	if(Math.abs(tLean)>=1){
		updateTowerHUD();towerMessage('Pusat graviti terkeluar dari tapak!','Centre of gravity left the base!',2);
		for(const b of tboxes.slice(1))tDebris.push({x:b.x,y:b.y,w:b.w,h:b.h,vx:(tLean>0?1:-1)*(90+Math.random()*160),vy:-90-Math.random()*130,rot:0,vr:(Math.random()-.5)*6,color:b.color});
		tboxes=[{...TBASE}];audioBeep(120,.3,'sawtooth');endTower(false);return;
	}
	if(towerFloor>=TFLOORS){updateTowerHUD();endTower(true);return}
	rollWind();updateTowerHUD();$('#tower-drop').disabled=false;
}
function updateTower(dt){
	if(towerState!=='playing')return;
	tClock+=dt;tSwayT+=dt*1.9;tShake=Math.max(0,tShake-dt*22);towerMsgT=Math.max(0,towerMsgT-dt);
	const s=tStage();
	tHookX+=tHookDir*s.speed*dt;
	const half=nextWidth()/2+s.sway;
	if(tHookX<130+half){tHookX=130+half;tHookDir=1}else if(tHookX>TW-130-half){tHookX=TW-130-half;tHookDir=-1}
	for(const d of tDebris){d.vy+=TGRAV*.5*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;d.rot+=d.vr*dt}
	tDebris=tDebris.filter(d=>d.y<TH+420);
	if(tFalling){
		tFalling.vy+=TGRAV*dt;tFalling.y+=tFalling.vy*dt;tFalling.x+=tFalling.vx*dt;
		const top=towerTop();
		if(tFalling.y+tFalling.h>=top.y){const f=tFalling;tFalling=null;f.y=top.y-f.h;settleBox(f);}
		else if(tFalling.y>TH+300){tFalling=null;towerLives--;towerStreak=0;towerMessage('Kotak terlepas dari menara','The box missed the tower',1.4);updateTowerHUD();
			if(towerLives<=0){endTower(false);return}rollWind();updateTowerHUD();$('#tower-drop').disabled=false}
	}
	const topY=towerTop().y,want=clamp(300-topY,0,TFLOORS*30+120);
	tCam+=(want-tCam)*Math.min(1,dt*4);
}
function drawTowerBox(b,lean){
	if(!b)return;
	tctx.save();
	if(lean){const px=TBASE.x+TBASE.w/2,py=TBASE.y;tctx.translate(px,py);tctx.rotate(lean*.05);tctx.translate(-px,-py)}
	tctx.fillStyle=b.color;tctx.strokeStyle='#133b32';tctx.lineWidth=3;rr(tctx,b.x,b.y,b.w,b.h,5);
	tctx.strokeStyle='rgba(19,59,50,.3)';tctx.lineWidth=2;
	tctx.beginPath();tctx.moveTo(b.x+b.w/2,b.y+4);tctx.lineTo(b.x+b.w/2,b.y+b.h-4);
	tctx.moveTo(b.x+8,b.y+b.h/2);tctx.lineTo(b.x+b.w-8,b.y+b.h/2);tctx.stroke();
	tctx.restore();
}
function drawTower(){
	const s=tStage();
	const g=tctx.createLinearGradient(0,0,0,TH);g.addColorStop(0,s.sky[0]);g.addColorStop(1,s.sky[1]);
	tctx.fillStyle=g;tctx.fillRect(0,0,TW,TH);
	tctx.globalAlpha=.35;tctx.fillStyle='#fffaf0';
	for(let i=0;i<5;i++){const x=((i*250+tClock*(8+s.wind*.5))%1300)-150,y=50+(i%3)*40;
		tctx.beginPath();tctx.ellipse(x,y,54,16,0,0,Math.PI*2);tctx.fill()}
	tctx.globalAlpha=1;
	tctx.save();
	if(tShake>0)tctx.translate((Math.random()-.5)*tShake,(Math.random()-.5)*tShake);
	tctx.translate(0,tCam);
	tctx.fillStyle='#7ba36c';tctx.fillRect(0,TBASE.y+TBASE.h,TW,TH);
	tctx.fillStyle='rgba(19,59,50,.14)';tctx.beginPath();tctx.ellipse(TBASE.x+TBASE.w/2,TBASE.y+TBASE.h+10,TBASE.w*.6,12,0,0,Math.PI*2);tctx.fill();
	drawTowerBox(tboxes[0],0);
	tctx.fillStyle='rgba(255,250,240,.92)';tctx.font='800 12px Arial';tctx.textAlign='center';
	tctx.fillText(tr('TAPAK PALET','PALLET BASE'),TBASE.x+TBASE.w/2,TBASE.y+20);
	for(let i=1;i<tboxes.length;i++)drawTowerBox(tboxes[i],tLean);
	for(const d of tDebris){tctx.save();tctx.translate(d.x+d.w/2,d.y+d.h/2);tctx.rotate(d.rot);
		tctx.fillStyle=d.color;tctx.strokeStyle='#133b32';tctx.lineWidth=3;rr(tctx,-d.w/2,-d.h/2,d.w,d.h,5);tctx.restore()}
	if(tFalling){
		tctx.globalAlpha=.28;tctx.fillStyle='#133b32';
		tctx.fillRect(tFalling.x,towerTop().y-4,tFalling.w,4);tctx.globalAlpha=1;
		drawTowerBox(tFalling,0);
	}
	tctx.restore();
	const sway=Math.sin(tSwayT)*s.sway,hx=tHookX+sway;
	tctx.fillStyle='#2c584c';tctx.fillRect(0,58,TW,10);
	tctx.fillStyle='#ffc94a';tctx.strokeStyle='#133b32';tctx.lineWidth=3;rr(tctx,tHookX-34,44,68,24,5);
	tctx.strokeStyle='#133b32';tctx.lineWidth=3;tctx.beginPath();tctx.moveTo(tHookX,68);tctx.lineTo(hx,104);tctx.stroke();
	tctx.fillStyle='#b8b3a6';rr(tctx,hx-9,104,18,10,3);
	if(!tFalling&&towerState==='playing'){
		const w=nextWidth();
		tctx.globalAlpha=.9;drawTowerBox({x:hx-w/2,y:114,w,h:30,color:TCOLORS[towerFloor%TCOLORS.length]},0);tctx.globalAlpha=1;
		tctx.strokeStyle='rgba(19,59,50,.35)';tctx.lineWidth=2;tctx.setLineDash([7,8]);
		tctx.beginPath();tctx.moveTo(hx,150);tctx.lineTo(hx+tWindNext*.55,towerTop().y+tCam);tctx.stroke();tctx.setLineDash([]);
	}
	tctx.fillStyle='rgba(7,30,26,.86)';tctx.fillRect(0,0,TW,40);
	tctx.fillStyle='#fffaf0';tctx.font='900 15px Arial';tctx.textAlign='left';
	tctx.fillText(`${tr('TINGKAT','FLOOR')} ${towerFloor}/${TFLOORS} \u00b7 ${pick(s.name)}`,20,26);
	tctx.textAlign='center';tctx.fillStyle=tWindNext===0?'#d8f45f':'#ffc94a';
	tctx.fillText(tWindNext===0?tr('ANGIN: TENANG','WIND: CALM'):`${tr('ANGIN','WIND')} ${tWindNext>0?'\u2192':'\u2190'} ${Math.abs(tWindNext)}`,TW/2,26);
	tctx.textAlign='right';tctx.fillStyle='#d8f45f';
	tctx.fillText(`${tr('TINGGI','HEIGHT')} ${towerFloor*30}cm`,TW-20,26);
	if(towerMsgT>0){tctx.globalAlpha=Math.min(1,towerMsgT*2);
		tctx.fillStyle='rgba(255,250,240,.95)';tctx.strokeStyle='#133b32';tctx.lineWidth=3;rr(tctx,TW/2-250,186,500,44,10);
		tctx.fillStyle='#133b32';tctx.font='800 15px Arial';tctx.textAlign='center';tctx.fillText(towerMsg,TW/2,214);tctx.globalAlpha=1}
}
function towerLoop(now){
	if(towerState!=='playing')return;
	tAcc+=Math.min(.05,Math.max(0,(now-tLast)/1000));tLast=now;
	let n=0;while(tAcc>=TSTEP&&n<7&&towerState==='playing'){updateTower(TSTEP);tAcc-=TSTEP;n++}
	if(n===7)tAcc=0;
	drawTower();
	if(towerState==='playing')towerRAF=requestAnimationFrame(towerLoop);
}
$('#tower-start').addEventListener('click',startTower);
$('#tower-pause').addEventListener('click',()=>towerState==='paused'?startTower():pauseTower());
$('#tower-reset').addEventListener('click',resetTower);
$('#tower-drop').addEventListener('click',dropBox);
/* ============ Input + complete bilingual refresh (V10) ============ */
const inputting=e=>/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName);
addEventListener('keydown',e=>{
	if(inputting(e))return;
	const k=e.key.toLowerCase();
	if(activeGame==='run'&&runState==='playing'){
		if(k==='a'||e.key==='ArrowLeft')runKeys.left=true;
		if(k==='d'||e.key==='ArrowRight')runKeys.right=true;
		if((k==='w'||e.key==='ArrowUp'||e.code==='Space')&&!e.repeat)queueJump();
		if(['ArrowLeft','ArrowRight','ArrowUp',' '].includes(e.key)||e.code==='Space')e.preventDefault();
	}else if(activeGame==='rush'&&rushState==='playing'&&/^[1-5]$/.test(e.key)){
		const bin=roundCfg().bins[+e.key-1];
		if(bin){sortInto(bin);e.preventDefault()}
	}else if(activeGame==='tower'&&towerState==='playing'&&e.code==='Space'){dropBox();e.preventDefault()}
	if(e.key==='Escape'){pauseRun();pauseRush();pauseTower()}
});
addEventListener('keyup',e=>{
	const k=e.key.toLowerCase();
	if(k==='a'||e.key==='ArrowLeft')runKeys.left=false;
	if(k==='d'||e.key==='ArrowRight')runKeys.right=false;
	if(k==='w'||e.key==='ArrowUp'||e.code==='Space')releaseJump();
});
$$('#run-touch button').forEach(b=>{const c=b.dataset.control,
	on=e=>{e.preventDefault();b.setPointerCapture?.(e.pointerId);c==='jump'?queueJump():runKeys[c]=true},
	off=e=>{e.preventDefault();c==='jump'?releaseJump():runKeys[c]=false};
	b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off)});
function refreshGameLanguage(){
	$$('[data-alt-ms]').forEach(e=>e.textContent=lang==='en'?e.dataset.altEn:e.dataset.altMs);
	const labels={'#menu-button':['Buka menu','Open menu'],'#motion-button':['Jeda animasi','Pause animations'],'#language-button':['Tukar bahasa','Switch language'],
		'#sound-button':[soundOn?'Matikan bunyi':'Hidupkan bunyi',soundOn?'Mute sound':'Enable sound'],
		'#run-canvas':['Permainan UpcycleVelocity','UpcycleVelocity game'],'#tower-canvas':['Permainan Cardboard Tower','Cardboard Tower game'],
		'#tower-drop':['Lepaskan kotak','Release the box'],'#rush-belt':['Tali sawat kitar semula','Recycling conveyor belt'],
		'.dialog-close':['Tutup dialog','Close dialog'],'.back-top':['Kembali ke atas','Back to top']};
	for(const [s,v] of Object.entries(labels)){const e=$(s);if(e)e.setAttribute('aria-label',lang==='en'?v[1]:v[0])}
	const soundLabel=$('#sound-button .button-text');if(soundLabel)soundLabel.textContent=soundOn?tr('BUNYI HIDUP','SOUND ON'):tr('BUNYI MATI','SOUND OFF');
	const controls={left:['Gerak ke kiri','Move left'],right:['Gerak ke kanan','Move right'],jump:['Lompat / boost','Jump / boost']};
	$$('#run-touch [data-control]').forEach(e=>e.setAttribute('aria-label',pick(controls[e.dataset.control])));
	updateRunHUD();updateRushBins();updateRushHUD();updateTowerHUD();
	setText('#rush-round-label',tr(`Pusingan ${Math.min(rushRound+1,ROUNDS.length)}`,`Round ${Math.min(rushRound+1,ROUNDS.length)}`));
	if(runState==='idle')setRunOverlay('UpcycleVelocity',tr('Empat aras: boost udara terhad, dron sampah yang boleh dipijak, ledge yang runtuh dan pintu kilang yang hanya terbuka apabila kuota dipenuhi.','Four levels: limited air boosts, stompable litter drones, collapsing ledges and a plant gate that only opens when the quota is met.'),tr('MULA ARAS 1','START LEVEL 1'));
	else if(runState==='paused')setRunOverlay(tr('Permainan dijeda','Game paused'),tr('Fizik dibekukan. Sambung apabila bersedia.','Physics frozen. Continue when ready.'),tr('SAMBUNG','CONTINUE'));
	else if(runState==='levelComplete')setRunOverlay(tr(`Aras ${runLevelIndex+1} selesai!`,`Level ${runLevelIndex+1} cleared!`),tr('Laluan seterusnya telah dibuka.','The next route is unlocked.'),tr('ARAS SETERUSNYA','NEXT LEVEL'));
	else if(runState==='ended')setRunOverlay(runWon?tr('Semua aras selesai!','All levels cleared!'):tr('Larian tamat','Run over'),`${tr('Skor','Score')}: ${Math.round(runScore)} \u2022 ${tr('Jumlah token','Total tokens')}: ${runTotal}`,tr('MAIN DARI AWAL','PLAY FROM START'));
	if(rushState==='idle')setRushOverlay('Recycle Rush',tr('Bahan bergerak di atas tali sawat. Asingkan bahan hadapan sebelum ia jatuh di hujung \u2014 lebih awal, lebih banyak mata.','Items ride a live conveyor. Sort the front item before it drops off the end \u2014 the earlier you sort, the more you score.'),tr('MULA PUSINGAN 1','START ROUND 1'));
	else if(rushState==='paused')setRushOverlay(tr('Talian dihentikan','Line stopped'),tr('Tali sawat berhenti. Tiada bahan hilang semasa dijeda.','The belt is stopped. Nothing is lost while paused.'),tr('SAMBUNG','CONTINUE'));
	else if(rushState==='roundComplete')setRushOverlay(tr(`Pusingan ${rushRound+1} selesai!`,`Round ${rushRound+1} cleared!`),tr('Tong baharu dan tali sawat lebih pantas menanti.','New bins and a faster belt are waiting.'),tr('PUSINGAN SETERUSNYA','NEXT ROUND'));
	if(towerState==='idle')setTowerOverlay('Cardboard Tower',tr('Meter imbangan menunjukkan pusat graviti menara. Angin diberitahu sebelum setiap jatuhan \u2014 tiada kejutan, hanya pengiraan.','The balance meter shows the tower\u2019s centre of gravity. Wind is announced before every drop \u2014 no surprises, just judgement.'),tr('MULA MEMBINA','START BUILDING'));
	else if(towerState==='paused')setTowerOverlay(tr('Dijeda','Paused'),tr('Kren dihentikan. Angin seterusnya masih sama.','The crane is stopped. The next gust is unchanged.'),tr('SAMBUNG','CONTINUE'));
	if(runState!=='playing')drawRun();
	if(towerState!=='playing')drawTower();
}
if(['localhost','127.0.0.1'].includes(location.hostname))window.__ecoV10Debug={
	snapshot:()=>({lang,run:{state:runState,level:runLevelIndex+1,items:runItems,required:runLevel.required,lives:runLives,boost,checkpoint,gateOpen:+gateOpen.toFixed(2)},
		rush:{state:rushState,round:rushRound+1,sorted:rushSorted,goal:roundCfg().goal,lives:rushLives,belt:Math.round(beltSpeed),onBelt:beltItems.length},
		tower:{state:towerState,floor:towerFloor,lives:towerLives,lean:+tLean.toFixed(2),wind:tWindNext,stage:pick(tStage().name)}}),
	validateRunLevels:()=>RUN_LEVELS.map((l,index)=>{
		const solid=l.plats.filter(p=>p.type!=='crumble');
		const onPlat=(x,y)=>l.plats.some(p=>x+PW>p.x&&x<p.x+p.w&&Math.abs(y+PH-p.y)<3);
		const safeFromHazard=x=>!l.hazards.some(h=>x+PW>h.x&&x<h.x+h.w);
		const sorted=[...solid].sort((a,b)=>a.x-b.x);
		let maxGap=0;
		for(let i=1;i<sorted.length;i++)maxGap=Math.max(maxGap,sorted[i].x-(sorted[i-1].x+sorted[i-1].w));
		return{index:index+1,
			spawnSafe:onPlat(l.spawn.x,l.spawn.y)&&safeFromHazard(l.spawn.x),
			checkpointsSafe:l.checkpoints.every(cp=>onPlat(cp.spawn.x,cp.spawn.y)&&safeFromHazard(cp.spawn.x)),
			tokensReachable:l.tokens.every(q=>l.plats.some(p=>q.x>=p.x-34&&q.x<=p.x+p.w+34&&q.y>=p.y-130&&q.y<=p.y-20)),
			enoughTokens:l.tokens.length>=l.required+1,
			goalOnFinalPlat:solid.some(p=>l.goal>=p.x&&l.goal<=p.x+p.w),
			maxGap}}),
	forceRunFall:()=>{player.y=RH+120;updateRun(RSTEP)},
	clearRunLevel:()=>{tokens.slice(0,runLevel.required).forEach(x=>{x.got=true});runItems=runLevel.required;gateOpen=1;player.x=runLevel.goal+22;updateRun(RSTEP)},
	clearRushRound:()=>{rushSorted=roundCfg().goal;completeRushRound()},
	stackTower:()=>{if(towerState==='playing'&&!tFalling){tHookX=TBASE.x+TBASE.w/2;tWindNext=0;dropBox()}},
	stats:()=>({runStep:RSTEP,towerStep:TSTEP,catchupCap:7,particles:runFx.length,confetti:confParts.length})};
/* Reflection, scores and data controls */
function fillGameSelect(){const select=$('#reflection-game'),value=select.value;select.innerHTML=`<option value="">${tr('Pilih permainan','Choose a game')}</option>`+PROJECTS.map(p=>`<option value="${p.id}">${escapeHTML(pick(p.name))}</option>`).join('')+`<option value="run">UpcycleVelocity</option><option value="rush">Recycle Rush</option><option value="tower">Cardboard Tower</option>`;select.value=value}
function renderCommunity(){const scores=storage.get(STORE.scores,[]).sort((a,b)=>b.score-a.score).slice(0,5);$('#leaderboard-list').innerHTML=scores.length?scores.map((s,i)=>`<li><span class="rank">${i+1}</span><span class="score-person"><b>${escapeHTML(s.name)}</b><small>${escapeHTML(s.game)}</small></span><strong class="score-points">${s.score}</strong></li>`).join(''):`<li class="empty-state">${tr('Belum ada skor. Main mini-game dahulu!','No scores yet. Play a mini-game!')}</li>`;const refs=storage.get(STORE.refs,[]).slice(-4).reverse();$('#reflection-count').textContent=refs.length;$('#reflection-list').innerHTML=refs.length?refs.map(r=>`<article class="reflection-item"><header><b>${escapeHTML(r.name)}</b><time>${new Date(r.date).toLocaleDateString(lang==='en'?'en-MY':'ms-MY')}</time></header><p>${escapeHTML(r.text)}</p></article>`).join(''):`<p class="empty-state">${tr('Tiada refleksi lagi. Jadilah yang pertama!','No reflections yet. Be the first!')}</p>`}
$('#reflection-text').addEventListener('input',e=>$('#char-count').textContent=`${e.target.value.length} / 300`);$('#reflection-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#reflection-name').value.trim(),game=$('#reflection-game').value,text=$('#reflection-text').value.trim();if(name.length<2||!game||text.length<12)return;syncName(name,$('#reflection-name'));const refs=storage.get(STORE.refs,[]);refs.push({name:name.slice(0,28),game,text:text.slice(0,300),date:new Date().toISOString()});storage.set(STORE.refs,refs.slice(-30));$('#reflection-text').value='';$('#reflection-game').value='';$('#char-count').textContent='0 / 300';$('#form-status').textContent=tr('Refleksi disimpan pada peranti ini.','Reflection saved on this device.');renderCommunity();toast(tr('Refleksi disimpan','Reflection saved'))});
$('#export-data').addEventListener('click',()=>{const payload={version:10,exportedAt:new Date().toISOString(),scores:storage.get(STORE.scores,[]),reflections:storage.get(STORE.refs,[]),achievements:storage.get(STORE.achievements,[])};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='eco-arcade-v10-my-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),600)});$('#clear-data').addEventListener('click',()=>$('#clear-dialog').showModal());$('#confirm-clear').addEventListener('click',()=>{[STORE.name,STORE.scores,STORE.refs,STORE.achievements,STORE.towerBest].forEach(k=>storage.remove(k));$$('.player-name').forEach(i=>i.value='');$('#reflection-name').value='';towerBest=0;resetRun();resetRush();resetTower();renderCommunity();renderAchievements();toast(tr('Data setempat dipadam','Local data cleared'))});
/* Lifecycle and initial state */
document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseRun('hidden');pauseRush('hidden');pauseTower('hidden')}else drawAmbient()});addEventListener('pagehide',()=>{cancelAnimationFrame(runRAF);cancelAnimationFrame(towerRAF);cancelAnimationFrame(rushRAF);cancelAnimationFrame(ambient.raf)});if('serviceWorker'in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}),{once:true});
/* ============ Login Gate System ============ */
function initLoginGate() {
	const overlay = $('#login-overlay'), form = $('#login-form');
	const userInput = $('#login-username'), passInput = $('#login-password');
	const errorEl = $('#login-error'), toggleBtn = $('#toggle-pass');
	const logoutBtn = $('#logout-button');

	if (!overlay || !form) return;

	const isAuth = sessionStorage.getItem('ecoArcadeV10Auth') === 'true';
	if (isAuth) {
		overlay.classList.add('authenticated');
	}

	toggleBtn?.addEventListener('click', () => {
		const isPass = passInput.type === 'password';
		passInput.type = isPass ? 'text' : 'password';
		toggleBtn.textContent = isPass ? '🙈' : '👁';
		toggleBtn.setAttribute('aria-label', isPass ? tr('Sembunyikan kata laluan', 'Hide password') : tr('Tunjukkan kata laluan', 'Show password'));
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const user = userInput.value.trim();
		const pass = passInput.value.trim();

		if (user === 'KUMP84DWIN' && pass === 'WECANW1NGENG') {
			sessionStorage.setItem('ecoArcadeV10Auth', 'true');
			overlay.classList.add('authenticated');
			errorEl.classList.add('hidden');
			passInput.value = '';
			toast(tr('Log masuk berjaya! Selamat datang.', 'Login successful! Welcome.'));
			if (!storage.get(STORE.name, '')) {
				syncName(user, userInput);
			}
		} else {
			errorEl.classList.remove('hidden');
			errorEl.textContent = tr('Nama pengguna atau kata laluan salah. Sila cuba lagi.', 'Invalid username or password. Please try again.');
			audioBeep(160, 0.15, 'sawtooth');
		}
	});

	logoutBtn?.addEventListener('click', () => {
		sessionStorage.removeItem('ecoArcadeV10Auth');
		overlay.classList.remove('authenticated');
		userInput.value = '';
		passInput.value = '';
		errorEl.classList.add('hidden');
		toast(tr('Anda telah log keluar.', 'You have logged out.'));
	});
}

translateStatic();resetRun();resetRush();resetTower();renderCommunity();renderAchievements();activateGame('run');initLoginGate();
})();
