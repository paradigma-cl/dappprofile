document.body.addEventListener('click', function(event) {
    /* filter out clicks on any other elements */
    if (event.target.nodeName == 'A' && event.target.getAttribute('aria-disabled') == 'true') {
        event.preventDefault();
    }
});

function disableLink(link) {
    /* 1. Add isDisabled class to parent span */
    link.parentElement.classList.add('isDisabled');
    /* 2. Store href so we can add it later */
    link.setAttribute('data-href', link.href);
    /* 3. Remove href */
    link.href = '';
    /* 4. Set aria-disabled to 'true' */
    link.setAttribute('aria-disabled', 'true');
}

function enableLink(link) {
    /* 1. Remove 'isDisabled' class from parent span */
    link.parentElement.classList.remove('isDisabled');
    /* 2. Set href */
    link.href = link.getAttribute('data-href');
    /* 3. Remove 'aria-disabled', better than setting to false */
    link.removeAttribute('aria-disabled');
}

$('.carousel').carousel({
    interval: 3000,
    pause: false
})