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

            // Simpan token ke localStorage
            localStorage.setItem("authToken", result.token);

            // Berhasil login
            alert("Login berhasil!");

            // Dapatkan role_id dari respons
            const role_id = result.role_id;

            // Arahkan ke halaman berdasarkan role_id
            switch (role_id) {
                case "832be9ea-6a97-4729-abad-e3150e4d03a5": // Ganti dengan ID role admin
                    window.location.href = "https://proyek-tiga.github.io/FrontendAdmin/";
                    break;
                case "138d5ceb-0b26-481d-89d1-5a4c94b895d7": // Ganti dengan ID role pembeli
                    window.location.href = "https://proyek-tiga.github.io/";
                    break;
                case "9c8ec6c5-39e4-45c2-abe2-65024d7bcae8": // Ganti dengan ID role penyelenggara
                    window.location.href = "https://proyek-tiga.github.io/FrontendPenyelenggara/";
                    break;
                default:
                    alert("Role tidak dikenali.");
            }
        } else {
            const error = await response.json();
            alert(`Login gagal: ${error.message || "Kesalahan tidak diketahui"}`);
        }
    } catch (err) {
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

