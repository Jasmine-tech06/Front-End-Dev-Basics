function checkLuck(){

    let guess = Number(document.getElementById("guess").value);

    let result = document.getElementById("result");

    if(guess === 6 || guess === 26){

        result.innerHTML = "🎉 Woohoo! It's a Lucky Number! 🍀";
        result.style.color = "#7CFC00";

    }

    else{

        result.innerHTML = "😔 Oops! Better Luck Next Time!<br>⭐ Lucky Numbers are 6 & 26";
        result.style.color = "#FFD700";

    }

}