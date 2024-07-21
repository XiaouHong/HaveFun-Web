<template>
    <el-divider content-position="right">★</el-divider>
    <el-row class="footer">
        <el-col :md="12" :sm="24" :xs="24">
            <div>
                <p>2024 - Have Fun</p>
                <p>Ver. 2024-07-21 16:05</p>
            </div>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
            <p>觀看更多</p>
            <div class="introduce">
                <a href="#">探索論壇</a>
                <a href="#">探索景點</a>
                <a href="#">探索規劃</a>
            </div>
        </el-col>
    </el-row>
</template>
<style>
.footer {
    /* background-color: rgba(0, 0, 0, 0.073); */
    color: rgb(242, 99, 132);
    padding: 15px;
    font-weight: bold;
}
.introduce {
    display: flex;
    flex-direction: column
}
</style>