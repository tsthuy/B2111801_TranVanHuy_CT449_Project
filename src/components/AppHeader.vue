<template>
    <div>
        <nav class="header navbar navbar-expand navbar-dark bg-dark">
            <a href="#" class="navbar-brand">
                Ứng dụng Quản lý danh bạ
            </a>
            <div class="mr-auto navbar-nav">
                <router-link :to="{ name: 'contactBook' }" class="nav-link">
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<style>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    /* Để đảm bảo hiển thị trên cả các phần tử khác */
}

.header .navbar {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.header .navbar-brand {
    margin-right: 0;
    /* Đảm bảo không có khoảng trắng phải của .navbar-brand */
}

.header .navbar-nav {
    margin-left: auto;
}

/* Nếu bạn muốn header có box-shadow */
.header.navbar-dark.bg-dark {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
