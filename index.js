var game = new Game();
var gameEngine = new GameEngine();
var imageManager = new ImageManager();
var soundManager = new SoundManager();
gameEngine.init(game, imageManager, soundManager, 30);

soundManager.registerSound({name:'failedSound', src:'sounds/failedSound.mp3'}, /*vol=*/1, /*dup=*/1);
soundManager.registerSound({name:'cocaine', src:'sounds/cocaine.mp3'}, 1, 1);
soundManager.registerSound({name:'rnrGreeting', src:'sounds/risenridegreeting.mp3'}, 1, 1);
soundManager.registerSound({name:'tvon', src:'sounds/tvon.mp3'}, 1, 1);
soundManager.registerSound({name:'itemfound', src:'sounds/itemfound.mp3'}, 1, 2);

var loadPromises = [
	imageManager.registerImage({name:'flightImage', path: 'image/', src:'flightIcon.png'}),

	imageManager.registerImage({name:'bg-0', path: 'image/', src:'bg-0.png'}),
	imageManager.registerImage({name:'bg-1', path: 'image/', src:'bg-1.png'}),
	imageManager.registerImage({name:'bg-2', path: 'image/', src:'bg-2.png'}),
	imageManager.registerImage({name:'bg-3', path: 'image/', src:'bg-3.png'}),
	imageManager.registerImage({name:'bg-4', path: 'image/', src:'bg-4.png'}),
	imageManager.registerImage({name:'bg-5', path: 'image/', src:'bg-5.png'}),
	imageManager.registerImage({name:'bg-99', path: 'image/', src:'bg-99.png'}),
	imageManager.registerImage({name:'guitarImage', path: 'image/', src:'guitar.png'}),
	imageManager.registerImage({name:'guitarItemImage', path: 'image/', src:'guitarItem.png'}),
	imageManager.registerImage({name:'tvConImage', path: 'image/', src:'tvCon.png'}),
	imageManager.registerImage({name:'tvConItemImage', path: 'image/', src:'tvConItem.png'}),
	imageManager.registerImage({name:'goggleImage', path: 'image/', src:'goggle.png'}),
	imageManager.registerImage({name:'goggleItemImage', path: 'image/', src:'goggleItem.png'}),
	imageManager.registerImage({name:'cocaineImage', path: 'image/', src:'cocaine.png'}),
	imageManager.registerImage({name:'cocaineItemImage', path: 'image/', src:'cocaineItem.png'}),
	imageManager.registerImage({name:'sunwithGoggleImage', path: 'image/', src:'sunwithGoggle.png'}),
	imageManager.registerImage({name:'sunwoGoggleImage', path: 'image/', src:'sunwoGoggle.png'}),
	imageManager.registerImage({name:'ECPwoGImage', path: 'image/', src:'ECPwoG.png'}),
	imageManager.registerImage({name:'ECPwithGImage', path: 'image/', src:'ECPwithG.png'}),
	imageManager.registerImage({name:'songNameLockerImage', path: 'image/', src:'songNameLocker.png'}),
	imageManager.registerImage({name:'jumesbImage', path: 'image/', src:'jumesb.png'}),
	imageManager.registerImage({name:'hangjumesbImage', path: 'image/', src:'hangjumesb.png'}),
	imageManager.registerImage({name:'hang011sbImage', path: 'image/', src:'hang011sb.png'}),
	imageManager.registerImage({name:'011sbItemImage', path: 'image/', src:'011sbItem.png'}),
	imageManager.registerImage({name:'hangsdoasbImage', path: 'image/', src:'hangsdoasb.png'}),
	imageManager.registerImage({name:'sdoasbItemImage', path: 'image/', src:'sdoasbItem.png'}),
	imageManager.registerImage({name:'jumesbItemImage', path: 'image/', src:'jumesbItem.png'}),
	imageManager.registerImage({name:'sbholderImage', path: 'image/', src:'sbholder.png'}),
	imageManager.registerImage({name:'oldGateImage', path: 'image/', src:'oldGate.png'}),
	imageManager.registerImage({name:'newGateImage', path: 'image/', src:'newGate.png'}),
	imageManager.registerImage({name:'lastGateImage', path: 'image/', src:'lastGate.png'}),
	imageManager.registerImage({name:'rnrCMImage', path: 'image/', src:'rnrCM.png'}),
	imageManager.registerImage({name:'bombCMImage', path: 'image/', src:'bombCM.png'}),
	imageManager.registerImage({name:'timeBombImage', path: 'image/', src:'timeBomb.png'}),
	imageManager.registerImage({name:'timeBombItemImage', path: 'image/', src:'timeBombItem.png'}),
	imageManager.registerImage({name:'boxImage', path: 'image/', src:'box.png'}),
	imageManager.registerImage({name:'brokenBoxWLImage', path: 'image/', src:'brokenBoxWL.png'}),
	imageManager.registerImage({name:'brokenBoxWoLImage', path: 'image/', src:'brokenBoxWoL.png'}),
	imageManager.registerImage({name:'letterItemImage', path: 'image/', src:'letterItem.png'}),
	imageManager.registerImage({name:'endingSceneMaskImage', path: 'image/', src:'endingSceneMask.png'}),
	];
	

Promise.all(loadPromises).then(gameEngine.start());

