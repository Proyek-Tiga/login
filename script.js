// Fungsi untuk memvalidasi form dan mengirim data ke backend
async function validateForm(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil nilai dari input email dan password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Buat objek data sesuai dengan struktur backend
    const data = {
        email: email,
        password: password,
    };

    try {
        // Kirim data ke backend menggunakan fetch
        const response = await fetch("https://tiket-backend-theta.vercel.app/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Cek status respons
        if (response.ok) {
            const result = await response.json();
            // Berhasil login
            alert("Login berhasil!");
            console.log(result); // Debugging - tampilkan respons backend

            // Redirect ke halaman utama (dashboard) setelah login
            window.location.href = "https://proyek-tiga.github.io/FrontendAdmin/"; // Sesuaikan dengan halaman Anda
        } else {
            const error = await response.json();
            // Gagal login
            alert(`Login gagal: ${error.message || "Kesalahan tidak diketahui"}`);
        }
    } catch (err) {
        // Tangani kesalahan jaringan atau lainnya
        console.error("Kesalahan saat menghubungi server:", err);
        alert("Gagal menghubungi server. Coba lagi nanti.");
    }
}

// Pasang event listener ke form
const form = document.getElementById("login-form");
form.addEventListener("submit", validateForm);

async function registerUser(event) {
    event.preventDefault(); // Mencegah reload halaman

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const userData = {
        role_id: role,
        name: name,
        email: email,
        password: password,
    };

    try {
        const response = await fetch("https://tiket-backend-theta.vercel.app/auth/regis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const result = await response.json();
            alert("Pendaftaran berhasil! Silakan login.");
            window.location.href = "index.html"; // Redirect ke halaman login
        } else {
            const error = await response.json();
            alert(`Pendaftaran gagal: ${error.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mencoba mendaftar.");
    }
}

