
let resetKeys=new Set();

document.addEventListener("keydown",event=>{
    resetKeys.add(event.code);

    if(
        event.metaKey&&
        event.altKey&&
        resetKeys.has("Period")&&
        resetKeys.has("KeyS")&&
        !event.repeat
    ){
        localStorage.removeItem("livePlaySecrets");
        secrets=[];

        secretMenu.classList.remove("unlocked");

        updateSecrets();
        heroClicks=0;

        secretFoundNumber.textContent="-- / 08";
        secretFoundMessage.textContent="Secrets have been reset.";
        secretFound.classList.add("show");

        clearTimeout(secretFoundTimer);

        secretFoundTimer=setTimeout(()=>{
            secretFound.classList.remove("show");
        },2200);

        console.log("Live Play secrets reset.");

        resetKeys.clear();
    }
});

document.addEventListener("keyup",event=>{
    resetKeys.delete(event.code);
});




const secretButton=document.querySelector("#secret-menu-button");
const secretMenu=document.querySelector(".secret-menu");
const secretCount=document.querySelector("#secret-count");
const secretMessage=document.querySelector("#secret-message");

secretButton.addEventListener("click",event=>{
    event.stopPropagation();
    secretMenu.classList.toggle("open");
});

document.addEventListener("click",event=>{
    if(!secretMenu.contains(event.target)&&!secretButton.contains(event.target)){
        secretMenu.classList.remove("open");
    }
});

const totalSecrets=8;
let secrets=JSON.parse(localStorage.getItem("livePlaySecrets"))||[];

function updateSecrets(){
    secretCount.textContent=secrets.length;

    if(secrets.length>=totalSecrets){
        secretMenu.classList.add("unlocked");
        secretMessage.textContent="Welcome, Oliver. <3";
    }else if(secrets.length>=6){
        secretMessage.textContent="You're getting close.";
    }else if(secrets.length>=3){
        secretMessage.textContent="Keep looking.";
    }else{
        secretMessage.textContent="Something is waiting.";
    }
}

function unlockSecret(id){

    if(secrets.includes(id)){
        console.log("Secret ALREADY found: " + id)
        return;
    }

    secrets.push(id);

    console.log("Secret NEWLY found: " + id)

    localStorage.setItem(
        "livePlaySecrets",
        JSON.stringify(secrets)
    );

    updateSecrets();
    showSecretFound();
}

updateSecrets();


const secretFound=document.querySelector("#secret-found");
const secretFoundNumber=document.querySelector("#secret-found-number");
const secretFoundMessage=document.querySelector("#secret-found-message");

let secretFoundTimer;

function showSecretFound(){

    const number=String(secrets.length).padStart(2,"0");

    secretFoundNumber.textContent=`${number} / ${totalSecrets}`;

    if(secrets.length>=totalSecrets){
        secretFoundMessage.textContent="You found everything.";
    }else{
        secretFoundMessage.textContent="Keep looking.";
    }

    secretFound.classList.add("show");

    clearTimeout(secretFoundTimer);

    secretFoundTimer=setTimeout(()=>{
        secretFound.classList.remove("show");
    },2200);
}



// SECRETS
const heroIcon=document.querySelector(".hero-icon");
const heroIconWrap=document.querySelector(".hero-icon-wrap");
let heroClicks=0;

heroIcon.addEventListener("click",()=>{

    heroClicks++;

    if(heroClicks>=3){

        unlockSecret("hero");

        heroIconWrap.classList.remove("secret-triggered");

        void heroIconWrap.offsetWidth;

        heroIconWrap.classList.add("secret-triggered");

        heroClicks=0;

        setTimeout(()=>{
            heroIconWrap.classList.remove("secret-triggered");
        },800);
    }
});

const designPhone=document.querySelector(".phone");
const designPhoneImage=designPhone.querySelector("img");

designPhone.addEventListener("dblclick",()=>{

    designPhoneImage.classList.add("secret-triggered");
    unlockSecret("design-phone");

    setTimeout(()=>{
        designPhoneImage.classList.remove("secret-triggered");
    },800);
});

const sleepyCard=document.querySelector(".sleepy-secret");
let sleepyTimer;

sleepyCard.addEventListener("mouseenter",()=>{

    clearTimeout(sleepyTimer);

    sleepyTimer=setTimeout(()=>{

        unlockSecret("moods-sleepy");

        sleepyCard.classList.remove("secret-triggered");

        void sleepyCard.offsetWidth;

        sleepyCard.classList.add("secret-triggered");

        setTimeout(()=>{
            sleepyCard.classList.remove("secret-triggered");
        },2200);

    },2500);
});

sleepyCard.addEventListener("mouseleave",()=>{
    clearTimeout(sleepyTimer);
});













const nav = document.querySelector("nav");

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        

        const target = document.querySelector(link.getAttribute("href"));
        const navHeight = nav.offsetHeight;

        let targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navHeight;

        if(target.id === "design"){
            targetPosition += window.innerHeight * 0.5;
        }
        if(target.id === "hero"){
            targetPosition = 0;
        }

            console.log(navHeight + ":" + targetPosition + " : " + target.id)


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});



const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(
    "#hero, #design, #moods, #rewards, #punishments"
);

const darkSections = document.querySelectorAll(
    ".product, .rewards"
);

function updateNav(){

    const navHeight = nav.offsetHeight;
    const checkPosition = navHeight + 40;

    let activeSection = null;

    sections.forEach(section => {

        const rect = section.getBoundingClientRect();

        if(
            rect.top <= checkPosition &&
            rect.bottom > checkPosition
        ){
            activeSection = section;
        }
    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            activeSection &&
            link.getAttribute("href") === `#${activeSection.id}`
        ){
            link.classList.add("active");
        }
    });


    let dark = false;

    darkSections.forEach(section => {

        const rect = section.getBoundingClientRect();

        if(
            rect.top <= checkPosition &&
            rect.bottom > checkPosition
        ){
            dark = true;
        }
    });


    nav.classList.toggle("dark", dark);
}

window.addEventListener("scroll", updateNav, {
    passive: true
});

window.addEventListener("resize", updateNav);

updateNav();



const product = document.querySelector(".product");
const scene = document.querySelector(".product-scene");

let targetProgress = 0;
let currentProgress = 0;

function updateTarget(){
    const rect = product.getBoundingClientRect();
    const total = product.offsetHeight - window.innerHeight;

    targetProgress = Math.min(
        Math.max(-rect.top / total, 0),
        1
    );
}

function animate(){
    const difference = targetProgress - currentProgress;

    currentProgress += difference * 0.8;

    if (Math.abs(difference) < 0.0001){
        currentProgress = targetProgress;
    }

    const blackProgress = Math.min(
        currentProgress / 0.18,
        1
    );

    const textProgress = Math.min(
        Math.max((currentProgress - 0.12) / 0.18, 0),
        1
    );
    
    const titleProgress = Math.min(
        Math.max((currentProgress - 0.22) / 0.25, 0),
        1
    );
    
    const subProgress = Math.min(
        Math.max((currentProgress - 0.45) / 0.2, 0),
        1
    );

    scene.style.setProperty(
        "--black-progress",
        blackProgress
    );

    scene.style.setProperty(
        "--text-progress",
        textProgress
    );
    
    scene.style.setProperty(
        "--title-progress",
        titleProgress
    );
    
    scene.style.setProperty(
        "--sub-progress",
        subProgress
    );

    requestAnimationFrame(animate);
}

window.addEventListener("scroll", updateTarget, { passive: true });
window.addEventListener("resize", updateTarget);

updateTarget();
animate();



const showcase = document.querySelector(".showcase");

const showcaseObserver = new IntersectionObserver(
    entries => {
        if(entries[0].isIntersecting){
            showcase.classList.add("visible");
        }else{
            showcase.classList.remove("visible");
        }
    },
    { threshold: 0.2 }
);

showcaseObserver.observe(showcase);



const phone = document.querySelector(".phone");

function animateDesignA(){
    const rect = showcase.getBoundingClientRect();
    const total = showcase.offsetHeight - window.innerHeight;

    let progress = -rect.top / total;
    progress = Math.min(Math.max(progress, 0), 1.2);



    const motion = Math.min(progress / 0.25, 1);

    const x = 120 - (motion * 240);
    const y = -Math.sin(motion * Math.PI) * 120;
    const scale = 0.85 + (motion * 0.25);

    const rotateY = motion * 360;

    phone.style.transform =
        `perspective(1200px)
        translate(${x}px, ${y}px)
        scale(${scale})
        rotateY(${rotateY}deg)`;

    

    requestAnimationFrame(animateDesignA);
}

animateDesignA();

const moodCards=document.querySelectorAll(".mood-card");

let moodSecretIndex=0;
let moodSecretTimer;

const moodSecretOrder=[0,1,2,3,4,5];

moodCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        clearTimeout(moodSecretTimer);

        if(index===moodSecretOrder[moodSecretIndex]){

            moodSecretIndex++;

            moodSecretTimer=setTimeout(()=>{
                moodSecretIndex=0;
            },2500);

            if(moodSecretIndex>=moodSecretOrder.length){

                moodSecretIndex=0;

                unlockSecret("moods-order");

                const cards=[...moodCards];

                cards.forEach((mood,i)=>{

                    mood.animate([
                        {
                            transform:"translate(0,0) rotate(0deg) scale(1)",
                            opacity:1
                        },
                        {
                            transform:`translate(${(Math.random()-.5)*80}px,${(Math.random()-.5)*60}px) rotate(${(Math.random()-.5)*25}deg) scale(.9)`,
                            opacity:.45
                        },
                        {
                            transform:`translate(${(Math.random()-.5)*40}px,${(Math.random()-.5)*30}px) rotate(${(Math.random()-.5)*12}deg) scale(1.05)`,
                            opacity:.8
                        },
                        {
                            transform:"translate(0,0) rotate(0deg) scale(1)",
                            opacity:1
                        }
                    ],{
                        duration:1100+i*70,
                        easing:"cubic-bezier(.16,1,.3,1)"
                    });

                });

                const moodContainer=document.querySelector(".mood-cards");

                moodContainer.animate([
                    {
                        transform:"scale(1)"
                    },
                    {
                        transform:"scale(.96) rotate(1deg)"
                    },
                    {
                        transform:"scale(1.04) rotate(-1deg)"
                    },
                    {
                        transform:"scale(1)"
                    }
                ],{
                    duration:1300,
                    easing:"cubic-bezier(.16,1,.3,1)"
                });

            }

        }else{

            moodSecretIndex=0;

            if(index===moodSecretOrder[0]){
                moodSecretIndex=1;
            }

        }

    });

});

const rewardCards = document.querySelectorAll(".reward-card");
rewardCards.forEach(card=>{
    let bonusTimer;
    let bonusHolding=false;

    card.addEventListener("pointerdown",event=>{

        if(!card.querySelector(".bonus-secret")||!card.classList.contains("revealed")){
            return;
        }

        bonusHolding=true;

        bonusTimer=setTimeout(()=>{

            if(!bonusHolding){
                return;
            }

            const bonus=card.querySelector(".bonus-secret");

            unlockSecret("rewards-bonus");

            bonus.classList.remove("secret-triggered");

            void bonus.offsetWidth;

            bonus.classList.add("secret-triggered");

            setTimeout(()=>{
                bonus.classList.remove("secret-triggered");
            },2000);

        },1000);
    });

    card.addEventListener("pointerup",()=>{
        bonusHolding=false;
        clearTimeout(bonusTimer);
    });

    card.addEventListener("pointerleave",()=>{
        bonusHolding=false;
        clearTimeout(bonusTimer);
    });

    card.addEventListener("click",event=>{

        if(card.classList.contains("animating")){
            return;
        }

        if(card.querySelector(".gift-secret")&&card.classList.contains("revealed")){

            const gift=card.querySelector(".gift-secret");

            unlockSecret("rewards-gift");

            gift.classList.remove("secret-triggered");

            void gift.offsetWidth;

            gift.classList.add("secret-triggered");

            setTimeout(()=>{

                gift.textContent="💍";

                for(let i=0;i<12;i++){

                    const sparkle=document.createElement("span");
                    sparkle.className="gift-sparkle";

                    const angle=Math.random()*Math.PI*2;
                    const distance=35+Math.random()*45;

                    sparkle.style.setProperty("--x",`${Math.cos(angle)*distance}px`);
                    sparkle.style.setProperty("--y",`${Math.sin(angle)*distance}px`);

                    gift.appendChild(sparkle);

                    setTimeout(()=>{
                        sparkle.remove();
                    },800);
                }

                gift.classList.remove("secret-triggered");

            },800);

            return;
        }

        card.classList.add("animating");

        if(!card.classList.contains("revealed")){
            revealReward(card);
        }else{
            hideReward(card);
        }
    });
});


function revealReward(card){

    card.classList.add("revealed");

    createSparkles(card, false);

    setTimeout(() => {
        card.classList.remove("animating");
    }, 1400);
}


function hideReward(card){

    card.classList.add("rewrapping");

    createSparkles(card, true);

    setTimeout(() => {

        card.classList.remove("revealed");
        card.classList.remove("rewrapping");

        card.classList.add("wrapped");

        setTimeout(() => {
            card.classList.remove("wrapped");
        }, 500);

    }, 500);

    setTimeout(() => {
        card.classList.remove("animating");
    }, 400);
}


function createSparkles(card, reverse){

    for(let i = 0; i < 18; i++){

        const spark = document.createElement("div");

        spark.className = "reward-spark";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 180;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        const size = 2 + Math.random() * 4;
        const duration = 0.6 + Math.random() * 0.4;

        spark.style.setProperty("--x", `${x}px`);
        spark.style.setProperty("--y", `${y}px`);
        spark.style.setProperty("--size", `${size}px`);
        spark.style.setProperty("--duration", `${duration}s`);

        card.appendChild(spark);

        requestAnimationFrame(() => {
            spark.classList.add(reverse ? "reverse" : "animate");
        });

        setTimeout(() => {
            spark.remove();
        }, duration * 1000 + 100);
    }


    for(let i = 0; i < 5; i++){

        const star = document.createElement("div");

        star.className = "reward-star";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 140;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        const duration = 0.8 + Math.random() * 0.4;

        star.style.setProperty("--x", `${x}px`);
        star.style.setProperty("--y", `${y}px`);
        star.style.setProperty("--duration", `${duration}s`);

        card.appendChild(star);

        requestAnimationFrame(() => {
            star.classList.add(reverse ? "reverse" : "animate");
        });

        setTimeout(() => {
            star.remove();
        }, duration * 1000 + 100);
    }
}
const punishmentCards=document.querySelectorAll(".punishment-card");

let timeoutInterval;
let resetTimer;
let teaseTimer;
let teaseTimeout;
let resetClicks=0;
let resetClickTimer;

const tease=punishmentCards[0];
const timeout=punishmentCards[1];
const disappoint=punishmentCards[2];
const ignore=punishmentCards[3];
const silence=punishmentCards[4];
const reset=punishmentCards[5];

tease.addEventListener("mouseenter",()=>{

    clearTimeout(teaseTimeout);

    tease.classList.remove("teased");

    teaseTimer=setTimeout(()=>{
        tease.classList.add("teased");
    },900);

});

tease.addEventListener("mouseleave",()=>{

    clearTimeout(teaseTimer);

    teaseTimeout=setTimeout(()=>{
        tease.classList.remove("teased");
    },250);

});

const timeoutDisplay=timeout.querySelector(".timeout-display");

timeout.addEventListener("mouseenter",()=>{

    clearInterval(timeoutInterval);

    let remaining=5;

    timeout.classList.add("timing-out");

    timeoutDisplay.textContent=`00:0${remaining}`;

    timeoutInterval=setInterval(()=>{

        remaining--;

        timeoutDisplay.textContent=`00:0${remaining}`;

        if(remaining<=0){

            clearInterval(timeoutInterval);

            timeout.classList.remove("timing-out");

            timeoutDisplay.textContent="00:00";

        }

    },1000);

});

timeout.addEventListener("mouseleave",()=>{

    clearInterval(timeoutInterval);

    timeout.classList.remove("timing-out");

    timeoutDisplay.textContent="00:05";

});

disappoint.addEventListener("mouseenter",()=>{
    disappoint.classList.add("disappointed");
});

disappoint.addEventListener("mouseleave",()=>{
    disappoint.classList.remove("disappointed");
});

ignore.addEventListener("mouseenter",()=>{
    ignore.classList.add("ignoring");
});

ignore.addEventListener("mouseleave",()=>{
    ignore.classList.remove("ignoring");
});

silence.addEventListener("mouseenter",()=>{
    silence.classList.add("silenced");
});

silence.addEventListener("mouseleave",()=>{
    silence.classList.remove("silenced");
});

reset.addEventListener("click",()=>{

    resetClicks++;

    clearTimeout(resetClickTimer);

    resetClickTimer=setTimeout(()=>{
        resetClicks=0;
    },1500);

    if(resetClicks==5){

        resetClicks=0;
    
        clearTimeout(resetTimer);
        clearTimeout(resetClickTimer);
    
        unlockSecret("punishments-reset");
    
        const screen=document.body;
    
        screen.animate([
            {
                transform:"translate(0,0) scale(1)",
                filter:"none"
            },
            {
                transform:"translate(-12px,6px) scale(1.01)",
                filter:"contrast(1.5)"
            },
            {
                transform:"translate(15px,-8px) scale(.99)",
                filter:"contrast(2) brightness(1.3)"
            },
            {
                transform:"translate(-20px,10px) scale(1.02)",
                filter:"contrast(3)"
            },
            {
                transform:"translate(22px,-12px) scale(.97)",
                filter:"contrast(2) blur(1px)"
            },
            {
                transform:"translate(-28px,14px) scale(1.03)",
                filter:"contrast(4) blur(2px)"
            },
            {
                transform:"translate(30px,-16px) scale(.96)",
                filter:"contrast(5) blur(3px)"
            },
            {
                transform:"translate(-35px,18px) scale(1.04)",
                filter:"contrast(6) blur(4px)"
            },
            {
                transform:"translate(0,0) scale(.8)",
                filter:"brightness(3) contrast(5) blur(8px)"
            },
            {
                transform:"translate(0,0) scale(.8)",
                filter:"brightness(0) contrast(10) blur(12px)"
            },
            {
                transform:"translate(0,0) scale(.8)",
                filter:"brightness(0) contrast(10) blur(12px)"
            },
            {
                transform:"translate(0,0) scale(1.08)",
                filter:"brightness(2) contrast(4) blur(3px)"
            },
            {
                transform:"translate(-8px,4px) scale(1.01)",
                filter:"contrast(2)"
            },
            {
                transform:"translate(5px,-3px) scale(.995)",
                filter:"none"
            },
            {
                transform:"translate(0,0) scale(1)",
                filter:"none"
            }
        ],{
            duration:2400,
            easing:"cubic-bezier(.16,1,.3,1)"
        });
    
        return;
    }

    if(reset.classList.contains("resetting")){
        return;
    }

    reset.classList.add("resetting");

    clearTimeout(resetTimer);

    resetTimer=setTimeout(()=>{
        reset.classList.remove("resetting");
    },1000);

});

const punishmentSection=document.querySelector(".punishments");

function revealPunishments(){

    const rect=punishmentSection.getBoundingClientRect();

    if(rect.top<window.innerHeight*.8){
        punishmentSection.classList.add("visible");
    }

}

window.addEventListener("scroll",revealPunishments,{
    passive:true
});

revealPunishments();





const hero=document.querySelector(".hero");

function updateHero(){
    const scroll=window.scrollY;
    const height=window.innerHeight;

    const progress=Math.min(scroll/height,1);

    hero.style.transform=`translateY(${scroll*.12}px) scale(${1-progress*.04})`;
    hero.style.opacity=1-progress*.75;
}

window.addEventListener("scroll",updateHero,{
    passive:true
});

updateHero();
















// ggez
const finalSecretButton=document.querySelector("#secret-menu-button");
const finalSecretMenu=document.querySelector(".secret-menu");
const finalHeroIcon=document.querySelector(".hero-icon");
const normalSecretFound=document.querySelector("#secret-found");

let finalMenuOpens=0;
let finalSecretArmed=false;
let finalSecretTriggered=false;
let finalMenuTimer;

const finalStyle=document.createElement("style");

finalStyle.textContent=`
.final-secret-icon{
    animation:finalSecretIcon 1s cubic-bezier(.16,1,.3,1);
}

@keyframes finalSecretIcon{
    0%{transform:rotate(0deg) scale(1);}
    35%{transform:rotate(90deg) scale(1.1);}
    70%{transform:rotate(180deg) scale(.9);}
    100%{transform:rotate(360deg) scale(1);}
}

.final-secret-armed{
    animation:finalSecretArmed 1.8s ease-in-out infinite;
}

@keyframes finalSecretArmed{
    0%,100%{transform:scale(1);}
    50%{transform:scale(1.06);}
}

.final-secret-black{
    position:fixed;
    inset:0;
    z-index:3000;
    background:#000;
    pointer-events:none;
    opacity:0;
}

.final-secret-black.active{
    opacity:1;
}

.final-secret-message{
    position:fixed;
    inset:0;
    z-index:3100;
    display:flex;
    align-items:center;
    justify-content:center;
    pointer-events:none;
    opacity:0;
    background:#000;
    color:#fff;
}

.final-secret-message.active{
    opacity:1;
}

.final-secret-message div{
    text-align:center;
}

.final-secret-message p{
    margin:0 0 14px;
    font-size:11px;
    letter-spacing:.2em;
    opacity:.45;
}

.final-secret-message strong{
    display:block;
    font-size:64px;
    font-weight:600;
    letter-spacing:-.06em;
}

.final-secret-message span{
    display:block;
    margin-top:10px;
    font-size:14px;
    opacity:.5;
}
`;

document.head.appendChild(finalStyle);

const finalBlack=document.createElement("div");
finalBlack.className="final-secret-black";
document.body.appendChild(finalBlack);

const finalMessage=document.createElement("div");
finalMessage.className="final-secret-message";

finalMessage.innerHTML=`
    <div>
        <p>SECRET FOUND</p>
        <strong>08 / 08</strong>
        <span>You found everything.</span>
    </div>
`;

document.body.appendChild(finalMessage);

finalSecretButton.addEventListener("click",()=>{

    if(secrets.length<7||finalSecretTriggered){
        return;
    }

    finalMenuOpens++;

    clearTimeout(finalMenuTimer);

    finalMenuTimer=setTimeout(()=>{
        finalMenuOpens=0;
    },2500);

    if(finalMenuOpens>=3){

        finalMenuOpens=0;

        finalSecretButton.classList.remove("final-secret-icon");

        void finalSecretButton.offsetWidth;

        finalSecretButton.classList.add("final-secret-icon");

        setTimeout(()=>{

            finalSecretButton.classList.remove("final-secret-icon");

            finalSecretMenu.classList.remove("open");

            finalSecretButton.style.transform="none";

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

            setTimeout(()=>{

                finalHeroIcon.classList.add("final-secret-armed");

                finalSecretArmed=true;

            },800);

        },1000);

    }

});

finalHeroIcon.addEventListener("click",()=>{

    if(!finalSecretArmed||finalSecretTriggered){
        return;
    }

    finalSecretTriggered=true;
    finalSecretArmed=false;

    finalHeroIcon.classList.remove("final-secret-armed");

    if(normalSecretFound){
        normalSecretFound.classList.remove("show");
    }

    unlockSecret("final");

    if(normalSecretFound){
        normalSecretFound.classList.remove("show");
    }

    document.body.animate([
        {
            transform:"scale(1)"
        },
        {
            transform:"scale(.92)"
        },
        {
            transform:"scale(.72)"
        },
        {
            transform:"scale(.45)"
        },
        {
            transform:"scale(.12)"
        },
        {
            transform:"scale(0)"
        }
    ],{
        duration:900,
        easing:"cubic-bezier(.16,1,.3,1)"
    });

    setTimeout(()=>{

        finalBlack.classList.add("active");

    },700);

    setTimeout(()=>{

        finalMessage.classList.add("active");
    
        finalBlack.classList.remove("active");
    
        document.body.style.transform="none";
    
        setTimeout(()=>{
    
            finalMessage.classList.remove("active");
    
        },4000);
    
    },1400);

});

finalHeroIcon.style.opacity="1";
finalHeroIcon.style.visibility="visible";
finalHeroIcon.style.transform="none";
finalHeroIcon.style.filter="none";





  








