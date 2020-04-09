<?php
    header('content:text/html;charset="utf-8"');

    // 统一返回格式
    $responseData = array('code'=>0,'message'=>'');

    //从前端获取登陆信息
    $username = $_POST['username'];
    $password = $_POST['password'];

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

    //连接数据库
    $link = mysql_connect("localhost","root","123456");

    //判断数据库是否连接成功
    if(!$link){
        $responseData['code'] = 3;
        $responseData['message'] = "服务器繁忙，请稍后再试";
        echo json_encode($responseData);
        exit;
    }

    //设置字符集
    mysql_set_charset("utf8");

    //选择数据库
    mysql_select_db("xiaomi");

    //MD5加密
    $pw_str = md5(md5(md5($password)."complex")."complicated");
    $sql = "SELECT * FROM users WHERE username = '{$username}' AND password = '{$pw_str}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);

    //登录失败
    if(!$row){
        $responseData['code'] = 4;
        $responseData['message'] = "用户名或密码错误";
        echo json_encode($responseData);
        exit;
    }else{
        //登陆成功
        $responseData['message'] = "登陆成功（即将返回首页...）";
        echo json_encode($responseData);
    }

    //关闭数据库
    mysql_close($link);
?>