<?php
    header('content:text/html;charset="utf-8"');

    // 统一返回格式
    $responseData = array('code'=>0,'message'=>'');

    //从前端获取注册信息
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $ctime = $_POST['ctime'];

    //判断用户名、密码是否为空
    if(!$username){
        $responseData['code'] = 1;
        $responseData['message'] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData['message'] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    //判断两次输入的密码是否一致
    if($password != $repassword){
        $responseData['code'] = 3;
        $responseData['message'] = "两次输入的密码不一致";
        echo json_encode($responseData);
        exit;
    }

    //连接数据库
    $link = mysql_connect("localhost","root","123456");

    //判断数据库是否连接成功
    if(!$link){
        $responseData['code'] = 4;
        $responseData['message'] = "服务器繁忙，请稍后再试";
        echo json_encode($responseData);
        exit;
    }

    //设置字符集
    mysql_set_charset("utf8");

    //选择数据库
    mysql_select_db("xiaomi");

    //验证用户名是否已经存在
    $sql = "SELECT * FROM users WHERE username = '{$username}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);

    //用户名已经存在
    if($row){
        $responseData['code'] = 5;
        $responseData['message'] = "用户名已经存在";
        echo json_encode($responseData);
        exit;
    }

    //可以注册
    //MD5加密
    $pw_str = md5(md5(md5($password)."complex")."complicated");
    $sql2 = "INSERT INTO users(username,password,ctime) VALUES('{$username}','{$pw_str}',{$ctime})";
    $res2 = mysql_query($sql2);

    //注册失败
    if(!$res2){
        $responseData['code'] = 6;
        $responseData['message'] = "注册失败";
        echo json_encode($responseData);
        exit;
    }

    //注册成功
    $responseData['message'] = "注册成功（即将跳转至登录页面...）";
    echo json_encode($responseData);

    //关闭数据库
    mysql_close($link);
?>