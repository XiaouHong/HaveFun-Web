<template>
    <el-dialog v-model="dialogVisible" :title="title" width="300" align-center :lock-scroll="false">
        <template #default>
            <slot name="content">
                {{ message }}
            </slot>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <slot name="footercontent">
                    <el-button @click="handleClose">確定</el-button>
                </slot>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
    visible: Boolean,
    title: string,
    message?: string
}>()

const dialogVisible = ref(props.visible);

const emit = defineEmits<{
    (e: 'update:visible', value: Boolean): void
}>()

watch(dialogVisible, (newVal) => {
    emit('update:visible', newVal);
});

watch(() => props.visible, (newVal) => {
    dialogVisible.value = newVal;
});

const handleClose = () => {
    dialogVisible.value = false
}
</script>