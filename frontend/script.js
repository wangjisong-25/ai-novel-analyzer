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

        // 在 uploadFile 函数开头添加：
        const loadingDiv = document.getElementById("loading");
        const loadingText = document.getElementById("loading-text");

        loadingDiv.classList.remove("hidden");
        loadingText.innerText = "正在拆解世界观架构..."; // 初始文案

        // 使用计时器模拟 AI 的思考进度
        setTimeout(() => { loadingText.innerText = "正在梳理人物关系..."; }, 2000);
        setTimeout(() => { loadingText.innerText = "正在提炼剧情脉络..."; }, 4000);

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
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = marked.parse(data.analysis); // 这一行直接让文字变成 Markdown 样式！

    } catch (error) {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").innerText = "请求失败：" + error;
    }
}