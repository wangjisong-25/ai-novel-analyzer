async function uploadFile() {
    try {
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];

        if (!file) {
            alert("请选择文件");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("result").innerText = "";

        // ==================== 🛠️ 核心修改：动态识别环境 ====================
        // 判断当前是不是本地环境 (localhost 或 127.0.0.1)
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        // 如果是本地，用 8000 端口；如果是线上，用 Render 后端地址（这里先用占位符，等后端好了直接改这里）
        const BACKEND_URL = isLocal
            ? "http://127.0.0.1:8000"
            : "https://你的后端地址.onrender.com";
        // ==================================================================

        // 将写死的地址替换为动态的 ${BACKEND_URL}/upload
        const response = await fetch(`${BACKEND_URL}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").innerText = data.analysis;

    } catch (error) {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").innerText = "请求失败：" + error;
    }
}