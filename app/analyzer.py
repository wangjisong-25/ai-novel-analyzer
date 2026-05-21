import requests
from .prompts import build_prompt

API_KEY = "sk-kcqwmwxqdnvwoiybwrxunocblqrvyvhttrjiaqjrbcabysqp"

def analyze_novel(text):

    text = text[:200]

    prompt = build_prompt(text)

    url = "https://api.siliconflow.cn/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "deepseek-ai/DeepSeek-V3",

        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],

        "stream": False
    }

    try:

        response = requests.post(
            url,
            headers=headers,
            json=data,
            timeout=30
        )

        print("状态码:")
        print(response.status_code)

        print("返回内容:")
        print(response.text)

        result = response.json()

        if "choices" not in result:
            return f"硅基流动错误: {result}"

        return result["choices"][0]["message"]["content"]

    except Exception as e:

        print("异常:")
        print(str(e))

        return f"程序异常: {str(e)}"


