// toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika humberger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});


// Sistem Loker
let selectedLockerId = null;

function selectLocker(lockerId) {
    // Hapus seleksi sebelumnya jika ada
    const previousSelected = document.querySelector('.locker.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }

    // Pilih loker baru jika berbeda dengan yang sebelumnya
    if (selectedLockerId !== lockerId) {
        const locker = document.querySelector(`.locker[data-id="${lockerId}"]`);
        if (locker && !locker.classList.contains('occupied')) {
            locker.classList.add('selected');
            selectedLockerId = lockerId;
            
            // Tampilkan pesan konfirmasi
            showConfirmation(lockerId);
        }
    } else {
        // Jika mengklik loker yang sama, hapus seleksi
        selectedLockerId = null;
    }
}

function showConfirmation(lockerId) {
    // Hapus konfirmasi sebelumnya jika ada
    const previousConfirmation = document.querySelector('.locker-confirmation');
    if (previousConfirmation) {
        previousConfirmation.remove();
    }

    // Buat elemen konfirmasi baru
    const confirmation = document.createElement('div');
    confirmation.className = 'locker-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <h3>Locker ${lockerId} Selected</h3>
            <p>Proceed with payment to unlock this locker?</p>
            <div class="confirmation-buttons">
                <button onclick="confirmLocker(${lockerId})" class="confirm-btn">Confirm</button>
                <button onclick="cancelSelection()" class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;

    // Tambahkan ke container loker
    document.querySelector('.locker-container').appendChild(confirmation);
}

function confirmLocker(lockerId) {
    // Di sini Anda bisa menambahkan logika untuk memproses pembayaran
    alert(`Processing payment for Locker ${lockerId}...`);
    cancelSelection(); // Hapus seleksi setelah konfirmasi
}

function cancelSelection() {
    // Hapus seleksi dan konfirmasi
    const selected = document.querySelector('.locker.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
    
    const confirmation = document.querySelector('.locker-confirmation');
    if (confirmation) {
        confirmation.remove();
    }
    
    selectedLockerId = null;
}

// Tambahkan CSS untuk konfirmasi
const style = document.createElement('style');
style.textContent = `
    .locker-confirmation {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(1, 1, 1, 0.95);
        padding: 2rem;
        border-radius: 10px;
        border: 2px solid var(--primary);
        z-index: 1000;
        text-align: center;
    }

    .confirmation-content h3 {
        color: var(--primary);
        margin-bottom: 1rem;
    }

    .confirmation-content p {
        color: #fff;
        margin-bottom: 1.5rem;
    }

    .confirmation-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .confirm-btn, .cancel-btn {
        padding: 0.5rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        font-family: "Poppins", sans-serif;
        transition: all 0.3s ease;
    }

    .confirm-btn {
        background: var(--primary);
        color: #fff;
    }

    .cancel-btn {
        background: transparent;
        color: #fff;
        border: 1px solid var(--primary);
    }

    .confirm-btn:hover {
        background: #8b6743;
    }

    .cancel-btn:hover {
        background: rgba(182, 137, 91, 0.2);
    }

    .locker.selected {
        transform: scale(1.05);
        box-shadow: 0 0 15px var(--primary);
    }
`;

document.head.appendChild(style);
