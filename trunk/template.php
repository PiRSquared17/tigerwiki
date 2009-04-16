<?php


global $subdir, $dirs, $files;

?>

<html>
	<head>
		<title><?php print $subdir;?></title>
		<style type="text/css">
		    body {
		        padding: 5px;
		        font-family: sans-serif;
		    }
		    h1 {
		        font-size: 16pt;
		    }
		    .box h2 {
		        font-size: 15px;
		        margin: 5px;
		        border-bottom: solid 1px #600;
		    }
		    .box {
			    float: left;
			    border: solid 1px #000;		    
			    height: 80%;
			    padding: 5px;
			    background: #ddd;
		    }
			.dirs {
			    width: 35%;
			    padding: 5px;
			    margin-right: 5px;
			}
			.dirs ul {
				list-style-image:url(images/folder.gif);
			}
			.files {
			    width: 55%;
			}
			.files ul {
				list-style-image:url(images/file.gif);
			}

		</style>
	</head>
	<body>
	    <h1>Select Page to link to</h1>
	    <div class="box dirs">
		<h2>Directories</h2>
		<ul >
			<?php
				if($subdir) {
					$path=explode('/',$subdir);
					array_pop($path);
					$parent=join('/',$path);
					print("<li><a href=\"?dir=$parent\">..</a></li>");
					$subdir = $subdir . '/';
				}
				foreach($dirs as $dir) {
				    $path='';
					print("<li><a href=\"?dir=$subdir$dir\">$dir</a></li>");
				}
				
			?>
		</ul>	
        </div>
        <div class="box files">
		<h2>Files</h2>
		<ul>
			<?php
				foreach($files as $file) {
					print("<li><a href=\"javascript:".wikilink($subdir.$file)."\">$file</a></li>");
				}
			?>
		</ul></div>
		<form>New File: <input name="new" type="text"><button onclick=<?php print( '"'. wikilink($subdir."'+document.forms[0]['new'].value+'") .'"'); ?>>Insert</button></form>

		
	</body>
</html>



