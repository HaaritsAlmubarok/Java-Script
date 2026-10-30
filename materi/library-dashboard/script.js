console.log("=== Library Management System ===");
const $favoriteButton = document.querySelector(".favorite-button");
$favoriteButton.addEventListener("click", () => {
    swal.fire({
        title: "Add to Favorites",
        text: "Are you sure you want to add this book to your favorites?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "No, cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire("Added!", "The book has been added to your favorites.", "success");
        } else if (result.dismiss === swal.DismissReason.cancel) {
            swal.fire("Cancelled", "The book was not added to your favorites.", "error");
        }
    });
});


// floating ui js script
const { computePosition, autoUpdate, offset, flip, shift } = window.FloatingUIDOM;
const $infoBtn = document.querySelector("#info-btn");
const $tip = document.querySelector("#tip");
let stopAutoUpdate = null;

function updateTip() {
    computePosition($infoBtn, $tip, {
        placement: "top",
        middleware: [offset(8), flip(), shift({ padding: 8 })]
    }).then(({ x, y }) => {
        Object.assign($tip.style, { left: `${x}px`, top: `${y}px` });
    });
}

function showTip() {
    $tip.classList.add("show");
    stopAutoUpdate = autoUpdate($infoBtn, $tip, updateTip);
}

function hideTip() {
    $tip.classList.remove("show");
    if (stopAutoUpdate) {
        stopAutoUpdate();
        stopAutoUpdate = null;
    }
}

[["mouseenter", showTip], ["mouseleave", hideTip], ["focus", showTip], ["blur", hideTip]]
    .forEach(([event, handler]) => $infoBtn.addEventListener(event, handler));



// tom select js script
const $kategoriSelect = document.querySelector("#kategori-result");
new TomSelect("#kategori",{
    persist: false,
    createOnBlur: true,
    create: true,
});