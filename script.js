function validateForm(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email and Password must be filled out!");
    } else {
        alert("Login Successful!");
        // You can add redirection or backend integration here
    }
}

function registerUser(event) {
    event.preventDefault(); // Mencegah reload halaman

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Contoh log data, ganti dengan logika penyimpanan backend jika diperlukan
    console.log("Nama:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Pendaftaran berhasil!");
}

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
      const response = await fetch("http://localhost:5000/auth/login", {
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
        window.location.href = "dashboard.html"; // Sesuaikan dengan halaman Anda
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
  
