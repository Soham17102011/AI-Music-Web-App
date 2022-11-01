song1 = "music.mp3";
song2 = "music2.mp3";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
songPlayed = "";

function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500)
    songPlayed = song1.isPlaying();
    if (scoreLeftWrist > 0.2) {
        fill('#FC6A03');
        stroke('#FC6A03');
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (songPlayed = false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Playing: Peter Pan";
        }
    }
}

function play() {
    song1.play();
    song1.setVolume(1);

}