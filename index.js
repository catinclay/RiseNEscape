var game = new Game();
var gameEngine = new GameEngine();
var imageManager = new ImageManager();
var soundManager = new SoundManager();
gameEngine.init(game, imageManager, soundManager, 30);

soundManager.registerSound({name:'failedSound', src:'sounds/failedSound.mp3'}, /*vol=*/1, /*dup=*/1);

var loadPromises = [
	imageManager.registerImage({name:'flightImage', path: 'image/', src:'flightIcon.png'}),
	imageManager.registerImage({name:'guitarImage', path: 'image/', src:'guitar.png'}),
	imageManager.registerImage({name:'guitarItemImage', path: 'image/', src:'guitarItem.png'}),
	imageManager.registerImage({name:'goggleImage', path: 'image/', src:'goggle.png'}),
	imageManager.registerImage({name:'goggleItemImage', path: 'image/', src:'goggleItem.png'}),
	imageManager.registerImage({name:'goggleItemImage', path: 'image/', src:'goggleItem.png'}),
	imageManager.registerImage({name:'sunwithGoggleImage', path: 'image/', src:'sunwithGoggle.png'}),
	imageManager.registerImage({name:'sunwoGoggleImage', path: 'image/', src:'sunwoGoggle.png'}),
	imageManager.registerImage({name:'ECPwoGImage', path: 'image/', src:'ECPwoG.png'}),
	imageManager.registerImage({name:'ECPwithGImage', path: 'image/', src:'ECPwithG.png'}),
];

Promise.all(loadPromises).then(gameEngine.start());

