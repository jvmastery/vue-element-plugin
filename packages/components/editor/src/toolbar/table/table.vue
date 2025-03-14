<script setup lang="ts">
import { inject, ref } from 'vue'
import ToolbarItem from '../toolbar-item.vue'
import { EditorInstanceSymbol } from '../../editor'

const editor = inject(EditorInstanceSymbol)
const buttonRef = ref()

const totalRows = 10
const totalCols = 10
const rows = Array.from({ length: totalRows })
const cols = Array.from({ length: totalCols })

const selectedRows = ref(0)
const selectedCols = ref(0)

/**
 * 选则区域
 * @param event
 */
const selectArea = (event: MouseEvent) => {
    const cell = (event.target as Element).closest('.cell')
    if (cell) {
        const rowIndex = [
            ...(cell.parentElement!.parentElement!.children as HTMLCollectionOf<HTMLElement>)
        ].indexOf(cell.parentElement as HTMLElement)
        const colIndex = [
            ...(cell.parentElement!.children as HTMLCollectionOf<HTMLElement>)
        ].indexOf(cell as HTMLElement)
        selectedRows.value = rowIndex + 1
        selectedCols.value = colIndex + 1
    }
}

/**
 * 离开表格
 */
const leavegrid = () => {
    selectedRows.value = 0
    selectedCols.value = 0
}

/**
 * 插入表格
 */
const insertTable = () => {
    editor?.value
        ?.chain()
        .focus()
        .insertTable({ rows: selectedRows.value, cols: selectedCols.value, withHeaderRow: true })
        .run()
}
</script>

<template>
    <ToolbarItem
        name="table"
        ref="buttonRef"
        title="插入表格"
        icon-position="-580px -20px"
        @click=""
    ></ToolbarItem>

    <el-popover
        ref="popoverRef"
        :virtual-ref="buttonRef"
        trigger="click"
        virtual-triggering
        width="auto"
        popper-style="padding: 0"
    >
        <div class="table-selector">
            <div class="grid" @mousemove="selectArea" @mouseleave="leavegrid" @click="insertTable">
                <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
                    <div
                        v-for="(col, colIndex) in cols"
                        :key="colIndex"
                        class="cell"
                        :class="{ selected: rowIndex < selectedRows && colIndex < selectedCols }"
                    ></div>
                </div>
            </div>
            <div class="properties">
                <div>
                    <div>
                        行数:
                        <el-input-number v-model="selectedRows" controls-position="right" />
                    </div>
                    <div>
                        列数:
                        <el-input-number v-model="selectedCols" controls-position="right" />
                    </div>
                </div>
            </div>
        </div>
    </el-popover>
</template>

<style scoped>
.table-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.grid {
    display: flex;
    flex-direction: column;
    padding: 5px;
    user-select: none;
}

.row {
    display: flex;
}

.cell {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin: 1px;
}

.cell.selected {
    background-color: #4a90e2;
    border-color: #4a90e2;
}

.properties {
    margin-top: 10px;
    font-size: 14px;
}
</style>
