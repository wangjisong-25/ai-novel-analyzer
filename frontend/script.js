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

        // 🛠️ 强行写死为 Render 线上后端地址，断绝手机端误判本地的后路
        const BACKEND_URL = "https://ai-novel-analyzer.onrender.com";

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