<script lang="ts">
    let { src = $bindable(), onchange } = $props();
    const on_file = () => {
        const file_com = document.createElement("input");
        file_com.type = "file";
        file_com.accept = "image/*";
        file_com.multiple = false;
        file_com.onchange = () => {
            const files = file_com.files;
            if (files) {
                if (files.length > 0) {
                    let file = files[0];
                    onchange(file);
                }
            }
        };
        file_com.click();
    };
</script>

<div>
    <button onclick={on_file}>
        <img src={src && src !== "" ? src : "/favicon.png"} alt="favicon" />
    </button>
</div>
