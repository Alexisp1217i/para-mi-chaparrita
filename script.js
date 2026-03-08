/* --- REPRODUCTOR DE MÚSICA --- */
let musicaIniciada = false;
document.body.addEventListener('click', function() {
    if (!musicaIniciada && document.getElementById('pantalla-login').style.display === 'none') {
        const musica = document.getElementById('musica-fondo');
        musica.volume = 0.4; 
        musica.play().then(() => { musicaIniciada = true; }).catch(e => console.log("Esperando clic..."));
    }
});

/* --- LOGIN --- */
function verificarLogin() {
    const user = document.getElementById('login-user').value.trim().toLowerCase();
    const pass = document.getElementById('login-pass').value.trim();
    const errorMsg = document.getElementById('login-error');

    if (user === 'edith' && pass === '210325') {
        errorMsg.classList.add('oculto');
        document.getElementById('login-form').classList.add('oculto');
        document.getElementById('login-loading').classList.remove('oculto');

        if (!musicaIniciada) {
            const musica = document.getElementById('musica-fondo');
            musica.volume = 0.4;
            musica.play().catch(e => console.log("Auto-play esperando..."));
            musicaIniciada = true;
        }

        setTimeout(() => {
            const loginScreen = document.getElementById('pantalla-login');
            loginScreen.style.opacity = '0';
            
            setTimeout(() => {
                loginScreen.style.display = 'none'; 
                const mainContent = document.getElementById('main-content');
                mainContent.classList.remove('oculto');
                crearCascada(); 
            }, 1000); 
        }, 3000);
        
    } else {
        errorMsg.classList.remove('oculto');
        document.getElementById('login-pass').value = '';
    }
}

/* --- MOTOR DEL RELOJ VIVO --- */
const fechaInicio = new Date("2025-03-21T00:00:00").getTime(); 

function actualizarReloj() {
    const ahora = new Date().getTime();
    const diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    const relojElemento = document.getElementById("reloj-vivo");
    if(relojElemento) {
        relojElemento.innerHTML = `${dias}d : ${horas}h : ${minutos}m : ${segundos}s`;
    }
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

/* --- 🟢 POLVO DE HADAS OPTIMIZADO (CERO LAG) 🟢 --- */
let trailTicking = false;
document.addEventListener('mousemove', function(e) {
    if(document.getElementById('pantalla-login').style.display !== 'none') return;
    if(Math.random() > 0.15) return; // Reduce carga

    if (!trailTicking) {
        window.requestAnimationFrame(() => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            const chispas = ['✨', '✦', '⭐'];
            trail.innerText = chispas[Math.floor(Math.random() * chispas.length)];
            
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
            trail.style.color = '#d4af37';
            document.body.appendChild(trail);
            
            setTimeout(() => { trail.remove(); }, 800);
            trailTicking = false;
        });
        trailTicking = true;
    }
});

/* --- LÓGICA MULTIMEDIA --- */
let multimediaActual = [];
let indiceActual = 0;

const modalMedia = document.getElementById("modal-recuerdo");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const videoAmpliado = document.getElementById("video-ampliado");
const videoSource = videoAmpliado.querySelector('source');
const textoRecuerdo = document.getElementById("texto-recuerdo");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

function abrirRecuerdo(tipo, rutas, mensaje) {
    textoRecuerdo.innerHTML = mensaje; 
    modalMedia.classList.remove("oculto");
    multimediaActual = Array.isArray(rutas) ? rutas : [rutas];
    indiceActual = 0;

    if (multimediaActual.length > 1) {
        btnPrev.classList.remove('oculto');
        btnNext.classList.remove('oculto');
    } else {
        btnPrev.classList.add('oculto');
        btnNext.classList.add('oculto');
    }

    renderizarMultimedia();
    explosionAmor(window.innerWidth/2, window.innerHeight/2);
}

function cambiarMultimedia(n) {
    indiceActual += n;
    if (indiceActual >= multimediaActual.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = multimediaActual.length - 1;
    renderizarMultimedia();
}

function renderizarMultimedia() {
    const rutaActual = multimediaActual[indiceActual];
    imagenAmpliada.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;

    if (rutaActual.toLowerCase().endsWith('.mp4')) {
        imagenAmpliada.classList.add('oculto');
        videoAmpliado.classList.remove('oculto');
        videoSource.src = rutaActual;
        videoAmpliado.load();
        videoAmpliado.play();
    } else {
        videoAmpliado.classList.add('oculto');
        videoAmpliado.pause();
        imagenAmpliada.classList.remove('oculto');
        imagenAmpliada.style.display = 'block'; 
        imagenAmpliada.src = rutaActual;
    }
}

function cerrarRecuerdo() {
    modalMedia.classList.add("oculto");
    videoAmpliado.pause();
    imagenAmpliada.src = ""; videoSource.src = "";
    multimediaActual = []; indiceActual = 0;
    imagenAmpliada.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
}

/* --- 🟢 EFECTO 3D TILT OPTIMIZADO (CERO LAG) 🟢 --- */
const mediaContainer = document.getElementById('contenedor-3d');
let tiltTicking = false;

mediaContainer.addEventListener('mousemove', (e) => {
    if(imagenAmpliada.classList.contains('oculto')) return; 
    
    if (!tiltTicking) {
        window.requestAnimationFrame(() => {
            const rect = mediaContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            imagenAmpliada.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            tiltTicking = false;
        });
        tiltTicking = true;
    }
});
mediaContainer.addEventListener('mouseleave', () => {
    imagenAmpliada.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
});

/* --- LÓGICA DEL DIARIO Y TIMELINE --- */
function abrirCarta() {
    document.getElementById('modal-carta').classList.remove('oculto');
    explosionAmor(window.innerWidth/2, window.innerHeight/2);
}
function cerrarCarta() { document.getElementById('modal-carta').classList.add('oculto'); }

function abrirLineaTiempo() {
    document.getElementById('modal-timeline').classList.remove('oculto');
    explosionAmor(window.innerWidth/2, window.innerHeight/2);
}
function cerrarLineaTiempo() { document.getElementById('modal-timeline').classList.add('oculto'); }

/* --- 🟢 CASCADA ESTELAR OPTIMIZADA 🟢 --- */
function crearCascada() {
    // Límite de seguridad para evitar lag en celulares
    if(document.getElementById('cascada-corazones').children.length > 40) return; 
    const contenedor = document.getElementById('cascada-corazones');
    const items = ['✦', '★', '✧', '⋆']; 

    const elemento = document.createElement('div');
    elemento.innerHTML = items[Math.floor(Math.random() * items.length)];
    elemento.classList.add('corazon-flotante');
    elemento.style.left = Math.random() * 100 + 'vw';
    
    const size = Math.random() * 12 + 10 + 'px'; 
    elemento.style.fontSize = size;
    const blurAmount = (parseFloat(size) < 15) ? '2px' : '0.8px';
    elemento.style.filter = `blur(${blurAmount})`;
    elemento.style.opacity = Math.random() * 0.3 + 0.1; 

    const duration = Math.random() * 8 + 8; 
    elemento.style.animationDuration = duration + 's';
    const driftStart = (Math.random() * 20 - 10) + 'px'; 
    elemento.style.setProperty('--drift-start', driftStart);
    const animName = (Math.random() > 0.5) ? 'cascadeLeft' : 'cascadeRight';
    elemento.style.animationName = animName;

    contenedor.appendChild(elemento);
    setTimeout(() => { elemento.remove(); }, duration * 1000); 
}
// Reducimos la velocidad de creación para dar un respiro a la PC
setInterval(crearCascada, 400); 

function latirFoto(elemento) {
    const contenedorFoto = elemento.closest('.foto-perfil');
    contenedorFoto.classList.remove('animacion-latir');
    void contenedorFoto.offsetWidth; 
    contenedorFoto.classList.add('animacion-latir');
}

const motivosAmor = [
    "Porque eres mi lugar seguro en el mundo.", "Por la forma en que me miras cuando crees que no me doy cuenta.", "Porque me haces querer ser un mejor hombre cada día.", "Por tu sonrisa que ilumina mis días más pesados.", "Porque no me imagino un futuro que no sea tomando tu mano.", "¿Ya te dije que me encantan tus ojos?", "Simplemente porque eres tú, mi Chaparrita hermosa.", "Porque a tu lado cualquier día normal se vuelve extraordinario.", "Por cómo me haces reír hasta que me duele la panza.", "Porque confías en mí más que nadie.", "Por la paz que siento cuando me abrazas.", "Porque eres la persona más hermosa del universo, por dentro y por fuera.", "Por cómo me escuchas cuando te cuento mis cosas.", "Porque haces que todos mis problemas parezcan más pequeños.", "Por tus besos que me reinician la vida.", "Porque siempre sabes exactamente qué decir para hacerme sentir bien.", "Por tu inteligencia y tu forma de ver el mundo.", "Porque eres mi mejor amiga y el amor de mi vida al mismo tiempo.", "Por la ternura con la que me tratas.", "Porque me aceptas exactamente como soy, con todos mis defectos.", "Por la forma en la que dices mi nombre.", "Porque me haces sentir que puedo lograr cualquier cosa.", "Por tus abrazos que me curan el alma.", "Porque cada canción de amor me recuerda a ti.", "Por lo bonita que te ves cuando te concentras en algo.", "Porque me enseñaste el verdadero significado de amar a alguien.", "Por la inmensa paciencia que me tienes.", "Porque a tu lado siento que estoy exactamente donde debo estar.", "Por cada 'buenos días' y 'buenas noches' que compartimos.", "Porque eres el sueño del que nunca quiero despertar."
];

let indiceMotivo = 0;
function siguienteMotivo() {
    const btn = document.getElementById('btn-motivos');
    btn.style.opacity = 0;
    setTimeout(() => {
        btn.innerHTML = motivosAmor[indiceMotivo] + " <span class='oro-emoji'>💭</span>";
        btn.style.opacity = 1;
        indiceMotivo++;
        if (indiceMotivo >= motivosAmor.length) indiceMotivo = 0;
    }, 200); 
}

/* --- RULETA --- */
const modalSlot = document.getElementById('modal-slot-machine');
const resultDiv = document.getElementById('slot-result');
const resultText = document.getElementById('slot-reward-text');
const spinButton = modalSlot.querySelector('.spin-handle');

const premiosRuleta = [
    "<span class='oro-emoji'>🎟️</span> VALE POR: Tarde de películas donde tú eliges todo.", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Un masaje de 20 minutos.", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Tu postre favorito (Yo invito).", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Una sesión de besos sin límite.", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Un abrazo de oso que reinicia la vida.", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Una salida por tu bebida favorita.", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Una cena romántica (Tú eliges el plan).", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: Un día entero donde te digo que SÍ a todo.", 
    "<span class='oro-emoji'>🎟️</span> VALE POR: 100 besos repartidos en todo el día."
];

let estaGirando = false;

function tirarRuleta() {
    estaGirando = false;
    modalSlot.classList.remove('oculto'); resultDiv.classList.add('oculto'); spinButton.disabled = false;
    const viejosConfetis = document.querySelectorAll('.confeti-piece');
    viejosConfetis.forEach(c => c.remove());

    for (let i = 1; i <= 3; i++) {
        const strip = document.getElementById(`strip-${i}`);
        strip.innerHTML = ""; 
        premiosRuleta.concat(premiosRuleta).concat(premiosRuleta).forEach(premio => {
            const item = document.createElement('div');
            item.classList.add('reel-item'); item.innerHTML = premio; strip.appendChild(item);
        });
        const randomStart = Math.floor(Math.random() * premiosRuleta.length);
        const itemHeight = 83.33; 
        const finalTranslateY = -((randomStart * itemHeight) - (250 / 2 - itemHeight / 2));
        strip.style.transitionDuration = '0s'; strip.style.transform = `translateY(${finalTranslateY}px)`;
    }
}

function lanzarConfeti() {
    const contenedor = document.getElementById('slot-result');
    const colores = ['#d4af37', '#ffd700', '#ffffff']; 
    for (let i = 0; i < 40; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti-piece';
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.left = '50%'; confeti.style.top = '20px';
        const angulo = Math.random() * Math.PI * 2; const distancia = Math.random() * 150 + 50; 
        const tx = Math.cos(angulo) * distancia; const ty = Math.sin(angulo) * distancia - 100; 
        confeti.style.setProperty('--tx', `${tx}px`); confeti.style.setProperty('--ty', `${ty}px`);
        confeti.style.animation = `burst 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`;
        contenedor.appendChild(confeti);
    }
}

function girarSlotMachine() {
    if (estaGirando) return; 
    estaGirando = true; spinButton.disabled = true; resultDiv.classList.add('oculto'); 
    const windowHeight = 250; const itemHeight = 83.33;
    const indexGanadorReal = Math.floor(Math.random() * premiosRuleta.length);
    
    for (let i = 1; i <= 3; i++) {
        const strip = document.getElementById(`strip-${i}`);
        let indexParada = (i === 3) ? indexGanadorReal : Math.floor(Math.random() * premiosRuleta.length);
        const landIndex = indexParada + (premiosRuleta.length * 2); 
        const finalTranslateY = -((landIndex * itemHeight) - (windowHeight / 2 - itemHeight / 2));
        const duracion = 1.5 + (i * 0.5); 
        strip.style.transition = `transform ${duracion}s ease-out`;
        strip.style.transform = `translateY(${finalTranslateY}px)`;
    }

    setTimeout(() => {
        resultText.innerHTML = premiosRuleta[indexGanadorReal];
        resultDiv.classList.remove('oculto'); lanzarConfeti(); 
        estaGirando = false; spinButton.disabled = false; 
    }, 3200); 
}

function cerrarSlotMachine() {
    if (estaGirando) return;
    for (let i = 1; i <= 3; i++) document.getElementById(`strip-${i}`).innerHTML = "";
    modalSlot.classList.add('oculto');
}

/* --- TERMINAL HACKER --- */
const modalTerminal = document.getElementById('modal-terminal');
const terminalTexto = document.getElementById('terminal-texto');
const zonaPassword = document.getElementById('zona-password');
const inputPass = document.getElementById('input-pass');

let lineasHackeo = [
    "> Iniciando conexión segura...", "> Autenticando usuario ITCh_II_CyberSec...",
    "> Bypass de firewall completado.", "> Localizando archivo encriptado: 'corazon_de_mi_chaparrita.sys'",
    "> Preparando protocolo de desencriptación..."
];

function iniciarHackeo() {
    modalTerminal.classList.remove('oculto'); terminalTexto.innerHTML = '';
    zonaPassword.classList.add('oculto'); inputPass.value = ''; let delay = 0;
    
    lineasHackeo.forEach((linea, index) => {
        setTimeout(() => {
            terminalTexto.innerHTML += `<div>${linea}</div>`;
            terminalTexto.scrollTop = terminalTexto.scrollHeight;
        }, delay); delay += 800; 
    });

    setTimeout(() => { zonaPassword.classList.remove('oculto'); inputPass.focus(); }, delay + 500);
}

function verificarPassword() {
    if (inputPass.value === "2103") {
        zonaPassword.classList.add('oculto');
        terminalTexto.innerHTML += `<br><div style="color: #00ff00;">> Contraseña aceptada. Desencriptando el corazón del sistema...</div><br>`;
        
        setTimeout(() => {
            const cartaText = `[ARCHIVO DESENCRIPTADO: Nivel de Seguridad - AMOR ETERNO]\n\nMi Chaparrita hermosa:\n\nSi estás leyendo esto, es porque introdujiste la fecha que cambió mi vida para siempre. Quería regalarte algo que nadie más pudiera darte, algo hecho con mis propias manos y escrito desde lo más profundo de mi mente y mi corazón.\n\nDesde aquel 21 de marzo, cada día a tu lado ha sido mi momento favorito. A veces siento que las palabras normales no me alcanzan para explicarte todo lo que me haces sentir. Eres mi paz en medio del caos, la persona que me motiva a ser mejor hombre y el lugar al que siempre quiero regresar. Amo tu sonrisa, amo tu forma de ser, y amo cómo, sin importar lo que pase afuera, cuando estoy contigo todo tiene sentido.\n\nEn la programación, a veces las cosas fallan o se complican, pero contigo he aprendido que el mejor proyecto de mi vida es nuestra relación. No importa qué errores nos tire el destino, estoy dispuesto a arreglarlo todo siempre y cuando sea tomando tu mano. Eres mi mejor amiga, mi confidente y la mujer de la que estoy perdidamente enamorado.\n\nGracias por existir, por elegirme y por dejarme amarte. Este código, esta página y mi corazón te pertenecen por completo.\n\nTe amo infinitamente.`;
            const container = document.createElement('div');
            container.className = 'texto-secreto'; terminalTexto.appendChild(container);
            let i = 0; const speed = 25; 

            function typeWriter() {
                if (i < cartaText.length) {
                    let char = cartaText.charAt(i);
                    if (char === '\n') { container.innerHTML += '<br>'; } else { container.innerHTML += char; }
                    if(i === 57) { container.innerHTML = `<strong>${container.innerHTML}</strong>`; }
                    container.innerHTML = container.innerHTML.replace('<span class="cursor-blink">|</span>', '');
                    container.innerHTML += '<span class="cursor-blink">|</span>';
                    i++; terminalTexto.scrollTop = terminalTexto.scrollHeight; setTimeout(typeWriter, speed);
                } else {
                    container.innerHTML = container.innerHTML.replace('<span class="cursor-blink">|</span>', '');
                }
            }
            typeWriter(); 
        }, 1000);
    } else {
        terminalTexto.innerHTML += `<div style="color: #ff4d4d; margin-top: 5px;">> ERROR: Contraseña incorrecta. Acceso denegado.</div>`;
        inputPass.value = ''; terminalTexto.scrollTop = terminalTexto.scrollHeight;
    }
}

function cerrarTerminal() { modalTerminal.classList.add('oculto'); }

/* --- FUNCIONES EXTRA --- */
function explosionAmor(x,y){
    for(let i=0;i<12;i++){
        const p=document.createElement("div");
        p.className="particula-amor"; p.innerHTML="♥"; 
        p.style.color="var(--oro)"; p.style.left=x+"px"; p.style.top=y+"px";
        p.style.setProperty("--x",(Math.random()*200-100)+"px");
        p.style.setProperty("--y",(Math.random()*200-100)+"px");
        document.body.appendChild(p);
        setTimeout(()=>p.remove(),1200);
    }
}

const mensajesSorpresa=[
    "Contigo cada día es mi recuerdo favorito ❤️",
    "Si volviera a elegir… te elegiría otra vez.",
    "Eres mi lugar favorito en el universo.",
    "Nuestro amor merece mil páginas más.",
    "Gracias por existir en mi historia."
];

function modoSorpresa(){
    if(Math.random()<0.35){
        const mensaje=mensajesSorpresa[Math.floor(Math.random()*mensajesSorpresa.length)];
        setTimeout(()=>{ alert("💌 Mensaje secreto:\n\n"+mensaje); },4000);
    }
}
modoSorpresa();