async function uploadFile() {

    try {

        const fileInput =
            document.getElementById("fileInput")

        const file = fileInput.files[0]

        if (!file) {

            alert("请选择文件")

            return
        }

        const formData = new FormData()

        formData.append("file", file)

        document
            .getElementById("loading")
            .classList.remove("hidden")

        document
            .getElementById("result")
            .innerText = ""

        const response = await fetch(
            "http://127.0.0.1:8000/upload",
            {
                method: "POST",
                body: formData
            }
        )

        const data = await response.json()

        document
            .getElementById("loading")
            .classList.add("hidden")

        document
            .getElementById("result")
            .innerText = data.analysis

    } catch (error) {

        document
            .getElementById("loading")
            .classList.add("hidden")

        document
            .getElementById("result")
            .innerText =
            "请求失败：" + error
    }
}