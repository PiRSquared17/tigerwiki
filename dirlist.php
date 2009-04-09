<?php
	
	function wikilink($file) {
		return "window.opener.FCK.CreateLink('$file');window.close()";
	}
	
	//ini_set('display_errors','yes');

	$files=array();	
	$dirs=array();


	$subdir=$_GET['dir'];
	if ($subdir) {
		$dir='pages/'. $subdir.'/';
	} else
		$dir='pages/';
		
    $list=glob($dir.'*');
	
	
	foreach($list as $item) {
		if (is_dir($item)) {
			$item=str_replace($dir,'',$item);
			$dirs[]=$item;
		} else {
			$item=str_replace($dir,'',$item);
			$item=str_replace('.txt','',$item);
			$files[]=$item;	
		}
	}
	
	include('template.php');	
?>
