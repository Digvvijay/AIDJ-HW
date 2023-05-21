lwx=0;
lwy=0;
lws=0;
rwx=0;
rwy=0;
rms=0;
bo="";
bos="";
be="";
bes="";
function preload()
{
    bo=loadSound("Bones.mp3");
    be=loadSound("Believer.mp3");
}
function setup()
{
    cv=createCanvas(550,500);
    cv.position(610,200);
    video=createCapture(VIDEO);
    video.position(610,200);
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function draw()
{
    image(video,560,100,550,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(rws > 0.2)
    {
        circle(rwx,rwy,20);

        if(rwy > lwy)
        {
            bos = "play";
            bes = "stop";
        }

        if(bos == "play")
        {
            bo.play();
            bo.setVolume(1);
            bo.rate(1);
        }
        else if(bos == "stop")
        {
            bo.stop();
        }
    }
    if(lws > 0.2)
    {
        circle(lwx,lwy,20);
        
        if(lwy > rwy)
        {
            bes = "play";
            bos = "stop";
        }

        if(bes == "play")
        {
            be.play();
            be.setVolume(1);
            be.rate(1);

        }
        else if(bes == "stop")
        {
            be.stop();
        }
    }
}

function modelLoaded()
{
    console.log('posenet is initialised');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
        lws=results[0].pose.keypoints[9].score;      
        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;
        rws=results[0].pose.keypoints[10].score;

    }
}

