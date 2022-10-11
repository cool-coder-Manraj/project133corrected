status = "";
objects = "";
img = "";

function preload()
{
    img = loadImage('IMG-2287.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status; detecting objects .......";
}

function modelLoaded()
{
    console.log("Model is Loaded :)");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    if(status != undefined)
    {
        image(img, 0, 0, 640, 420)
        for(var i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status; objects detected";
            fill(255, 0, 0);
            stroke(255, 0, 0);
            noFill();
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 10);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}