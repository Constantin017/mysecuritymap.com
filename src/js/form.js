import axios from 'axios';
import Inputmask from "inputmask";

/**
 * Google ReCaptcha
 */
let pubKey = '';
let pubToken = '';

if (window.grecaptcha) {
    grecaptcha.ready(function() {
        grecaptcha.execute(pubKey, { action: 'submit' }).then(function(token) {
            pubToken = token;
        });
    });
}

let formPost = 'lp_mysecuritymap';

Inputmask({ mask: "+38(999)-999-99-99" }).mask(document.querySelectorAll("input[name=phone]"));

let lang = document.querySelector('html').lang;

var modalForm = document.getElementById('modalForm');

var btnDisableModalForm = document.getElementById('btnDisableModalForm');
if (btnDisableModalForm) {
    btnDisableModalForm.addEventListener('click', () => {
        modalForm.classList.toggle('active');
        consultForm.classList.add('hidden');
        orderForm.classList.add('hidden');
        testForm.classList.add('hidden');
        priceListEquipmentForm.classList.add('hidden');
        priceListServiceForm.classList.add('hidden');
    });
}

var modalFormAction = function(options) {

    const formId = options.formId || "";
    const submitFormBtnId = options.submitFormBtnId || "";
    const errorTextId = options.errorTextId || "";
    const thanksTextId = options.thanksTextId || "";
    const inputElements = options.inputElements || [];

    const elementBtn = document.getElementById(submitFormBtnId);
    if (elementBtn) {
        elementBtn.addEventListener('click', (event) => {
            event.preventDefault();

            let formData = {};
            let validData = false;
            const formById = document.getElementById(formId);
            const errorText = document.getElementById(errorTextId).innerText;
            const thanksText = document.getElementById(thanksTextId).innerText;

            formData['type'] = formId;
            formData['lang'] = lang;
            formData['form'] = formPost;
            formData['google'] = pubToken;

            for (let element of inputElements) {
                validData = false;
                let formElement = document.getElementById(element);
                let nameElement = formElement.getAttribute('name');
                let valueElement = formElement.value;
                formData[nameElement] = valueElement;
                if (formElement.validity.valid) {
                    validData = true;
                }
            };

            if (validData) {
                axios.post('/api/', formData).then(function(response) {
                    alert(thanksText);
                    formById.reset();
                    btnDisableModalForm.click();
                }).catch(function() {
                    alert("Something went wrong. Please try again latter.");
                });
            } else {
                alert(errorText);
                formById.focus();
            }
        });
    }
}

var submitAskForm = document.getElementById('submitAskForm');
if (submitAskForm) {
    submitAskForm.addEventListener('click', (event) => {
        event.preventDefault();

        var documentAskForm = document.forms.askForm;
        var askFormData = new FormData(documentAskForm);
        let errorText = document.getElementById('askFormErrorsText').innerText;
        let thanksText = document.getElementById('askFormThanksText').innerText;

        askFormData.set('form', 'lp_mysecuritymap');
        askFormData.set('google', pubToken);
        askFormData.set('lang', lang);
        askFormData.set('type', 'submitAskForm');

        if (askFormData.get('name') !== '' && askFormData.get('phone') !== '' && askFormData.get('message') !== '') {

            axios({
                method: 'POST',
                url: '/api/',
                data: askFormData
            }).then(function(response) {
                alert(thanksText);
                documentAskForm.reset();
            }).catch(function() {
                alert("Something went wrong. Please try again latter.");
            });

        } else {
            alert(errorText);
            documentAskForm.focus();
        }

    });
}

var btnActiveConsultForm = document.getElementById('btnActiveConsultForm');
if (btnActiveConsultForm) {
    btnActiveConsultForm.addEventListener('click', () => {
        modalForm.classList.toggle('active');
        consultForm.classList.remove('hidden');
    });
    modalFormAction({
        formId: 'consultForm',
        submitFormBtnId: 'consultFormSubmit',
        errorTextId: 'consultFormErrorsText',
        thanksTextId: 'consultFormThanksText',
        inputElements: [
            'consultFormInputName',
            'consultFormInputPhone'
        ]
    });
}

var btnActiveTestForm = document.getElementById('btnActiveTestForm');
if (btnActiveTestForm) {
    btnActiveTestForm.addEventListener('click', () => {
        modalForm.classList.toggle('active');
        testForm.classList.remove('hidden');
    });
    modalFormAction({
        formId: 'testForm',
        submitFormBtnId: 'testFormSubmit',
        errorTextId: 'testFormErrorsText',
        thanksTextId: 'testFormThanksText',
        inputElements: [
            'testFormInputName',
            'testFormInputPhone',
            'testFormInputEmail'
        ]
    });
}

var btnActiveOrderForm = document.getElementsByClassName('btnActiveOrderForm');
if (btnActiveOrderForm) {
    for (let index = 0; index < btnActiveOrderForm.length; index++) {
        const element = btnActiveOrderForm[index];
        element.addEventListener('click', () => {
            modalForm.classList.toggle('active');
            orderForm.classList.remove('hidden');
        });
    }

    modalFormAction({
        formId: 'orderForm',
        submitFormBtnId: 'orderFormSubmit',
        errorTextId: 'orderFormErrorsText',
        thanksTextId: 'orderFormThanksText',
        inputElements: [
            'orderFormInputName',
            'orderFormInputPhone',
            'orderFormInputEmail'
        ]
    });
}

var btnActivePriceListEquipmentForm = document.getElementById('btnActivePriceListEquipmentForm');
if (btnActivePriceListEquipmentForm) {
    btnActivePriceListEquipmentForm.addEventListener('click', () => {
        modalForm.classList.toggle('active');
        priceListEquipmentForm.classList.remove('hidden');
    });
    modalFormAction({
        formId: 'priceListEquipmentForm',
        submitFormBtnId: 'priceListEquipmentFormSubmit',
        errorTextId: 'priceListEquipmentFormErrorsText',
        thanksTextId: 'priceListEquipmentFormThanksText',
        inputElements: [
            'priceListEquipmentFormInputName',
            'priceListEquipmentFormInputPhone',
            'priceListEquipmentFormInputEmail'
        ]
    });
}

var btnActivePriceListServiceForm = document.getElementById('btnActivePriceListServiceForm');
if (btnActivePriceListServiceForm) {
    btnActivePriceListServiceForm.addEventListener('click', () => {
        modalForm.classList.toggle('active');
        priceListServiceForm.classList.remove('hidden');
    });
    modalFormAction({
        formId: 'priceListServiceForm',
        submitFormBtnId: 'priceListServiceFormSubmit',
        errorTextId: 'priceListServiceFormErrorsText',
        thanksTextId: 'priceListServiceFormThanksText',
        inputElements: [
            'priceListServiceFormInputName',
            'priceListServiceFormInputPhone',
            'priceListServiceFormInputEmail'
        ]
    });
}