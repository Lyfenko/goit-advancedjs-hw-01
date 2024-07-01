import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const saveFormState = throttle(() => {
    const formData = {
        email: emailInput.value,
        message: messageInput.value
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

const loadFormState = () => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
        const { email, message } = JSON.parse(savedState);
        emailInput.value = email || '';
        messageInput.value = message || '';
    }
};

const handleSubmit = event => {
    event.preventDefault();
    console.log({
        email: emailInput.value,
        message: messageInput.value
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset();
};

form.addEventListener('input', saveFormState);
form.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', loadFormState);
