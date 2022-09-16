sehirler=["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];
cars = [
    "Abarth","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Bugatti","Cadillac","Chevrolet","Chrysler","Citroën","Dacia","Daewoo","Daihatsu","Dodge","Donkervoort","DS","Ferrari","Fiat","Fisker","Ford","Honda","Hummer","Hyundai","Infiniti","Iveco","Jaguar","Jeep","Kia","KTM","Lada","Lamborghini","Lancia","Land Rover","Landwind","Lexus","Lotus","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","MG","Mini","Mitsubishi","Morgan","Nissan","Opel","Peugeot","Porsche","Renault","Rolls-Royce","Rover","Saab","Seat","Skoda","Smart","SsangYong","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"]

let letter = document.querySelector("#value")
letter.addEventListener("input",verify)
let joker=document.querySelector("#joker")
joker.addEventListener("click",hint)
let head = document.querySelector(".head")
let body = document.querySelector(".body")
let left = document.querySelector(".right")
let right = document.querySelector(".left")
let leftl = document.querySelector(".rightl")
let rightl = document.querySelector(".leftl")
let word = document.querySelector("#word")
let indexes = []
let randoms=[]
let refresh = document.querySelector("#refresh")
refresh.addEventListener("click",refr)
let guess =document.querySelector("#guess")
let guessbtn = document.querySelector("#guessbtn")
guessbtn.addEventListener("click",guessing)
let area = document.querySelector("#areaword")
let alert = document.querySelector("#alert")
let baslik =document.querySelector("#baslik")
let letters = document.querySelector("#letters")

let subject = prompt("Konuyu Yazınız: Arabalar ya da Şehirler")
if(subject != null){
    if(subject.includes("araba")){
        sehirler=[...cars]
        baslik.innerHTML=`
            ${"ARABALAR"}
        `
    }   
}
const arr = []
let game_flag=true
let number = Math.round(Math.random()*sehirler.length)
console.log(sehirler[number].toLocaleLowerCase());
const size = sehirler[number].length
let count=0;let count2=0; let hit_count=0;let templet=""
for (let index = 0; index < sehirler[number].length; index++) {
    let li = document.createElement("li")
    li.innerHTML=`
        ${"*"}
    `
    li.classList.add("text-decoration-underline")
    word.append(li)
}

function guessing() {
    if(guess.value.toLocaleLowerCase() === sehirler[number].toLocaleLowerCase()){
        area.innerHTML=`
            <h3 class="mt-2 headguess">${guess.value.charAt(0).toLocaleUpperCase()+ guess.value.substring(1).toLocaleLowerCase()}</h3>
        `
        showAlert("Tekte Bildin !!!")
        gameover()
    }
    else{
        showAlert("Tekte Başaramadın !!!")
        guess.value=""
        setTimeout(() => {
            alert.classList.add("invisible")
        }, 4000);
    }
}
function gameover(params) {
        game_flag=false
        letter.disabled=true
        guess.disabled=true
        joker.disabled=true
        guessbtn.disabled=true
}
function hint() {
    if(game_flag){
        let hint_letter;
        while (true) {
            hint_letter=Math.round(Math.random()*sehirler[number].length)
            if(hint_letter===sehirler[number].length)
                hint_letter--;              
            if(!randoms.includes(hint_letter)){
                randoms.push(hint_letter)
                hit_count++;
                console.log("count "+count);
                console.log("hint "+hit_count);
                // console.table(randoms);
                break;
            }
        }
        indexes[hint_letter]=hint_letter
        fill(indexes)
    }
    if((hit_count+count)===sehirler[number].length){
        showAlert("Joker Yardımıyla İle Kazandın :(")
        gameover()
    }
}
function showAlert(params) {
    alert.children[0].innerHTML=`
            ${params}
            ${"Doğru Cevap: "+sehirler[number]}
        `
        alert.classList.add("anm")
        alert.classList.remove("invisible")
}
function fill(letter_indexez) {
    for (let index = 0; index < letter_indexez.length; index++) {
        if(index===letter_indexez[index]){
            word.children[index].innerHTML=`
                ${sehirler[number][index]}
            `
            word.children[index].classList.remove("text-decoration-underline")
        }
        
    }
}
function refr() {
    window.location.reload()
}
function verify() {
    let flag=false
    if(letter.value!="" && !(templet.includes(letter.value.toLocaleLowerCase()))){
        if(sehirler[number].toLocaleLowerCase().includes(letter.value.toLocaleLowerCase())){
            flag=true
            for (let index = 0; index < sehirler[number].length; index++) {
                if(letter.value.toLocaleLowerCase()===sehirler[number][index].toLocaleLowerCase()){
                    indexes[index]=index
                    if(!randoms.includes(index)){
                        randoms[index]=index
                        // hit_count++;
                        count++;
                    }
                }
            }
            // console.table(indexes)
            fill(indexes)
        }
        if(!flag)
            arr.push(flag)
    }
    if(arr.length===1){
        head.classList.remove("invisible")      
    }else if(arr.length===2){
        body.classList.remove("invisible")
    }else if(arr.length===3){
        leftl.classList.remove("invisible")     
    }else if(arr.length===4){
        rightl.classList.remove("invisible")
    }else if(arr.length===5){
        left.classList.remove("invisible")
    }else if(arr.length===6){
        right.classList.remove("invisible")
        setTimeout(fail,300)
        gameover()
    }
    if(count2===0 &&!(templet.includes(letter.value))){
        templet+=letter.value
        count2++
    }
    else if(!templet.includes(letter.value)){
        templet+="-"+letter.value
    }  
    letters.innerHTML=`
        <span>${"Kullanılanlar :"+templet}</span>
    `
    letter.value=""
    console.log("count "+count);
    console.log("hint "+hit_count);
    if(((count+hit_count)===size)){
        showAlert("Tebrikler Kelimeyi Buldun !!!")
        gameover()
    }
}
function fail() {
    showAlert("Başaramadın Adam Öldü !!!")
    gameover()
}
