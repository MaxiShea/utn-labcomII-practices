const btn = document.getElementById('button');
const email = document.querySelector('#email');
const sectionHelpResult = document.querySelector('#section-help-result');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.textContent = 'Enviando...'

        const serviceID = 'default_service';
        const templateID = 'contact_form';

        const valido = Validacion()
        console.log(valido)
        console.log(email.value)
        // console.log(valido)

        if (valido) {
            emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.textContent = 'Enviar';
                alert('Mensaje Enviado!');
            }, (err) => {
                btn.textContent = 'Enviar';
                alert(JSON.stringify(err));
            });
        } else {
            btn.textContent = 'Enviar';
            sectionHelpResult.innerHTML = `<p>Ingrese un Email valido</p>`
            setTimeout( () => {
                sectionHelpResult.innerHTML = ``
            }, 3000)
        }
    });

const Validacion = () => {
    var expemail = new RegExp('^(.+)@(\\S+)$');
    if (expemail.test(email.value)) {
        // console.log("incluye xx@xx")
        return true
    }
    else {
        // console.log('no incluye xx@xx')
        return false
    }
}