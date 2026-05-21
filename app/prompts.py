def build_prompt(text):

    return f"""
请用简短语言分析下面小说：

1. 故事简介
2. 世界观
3. 文风

每部分50字以内。

小说：
{text}
"""