	var total="0";
	var op="";		
	var opt_st=0;
	var l_num="0";
	var r_num="0";
	var r_num_log=0;
	var log="";
		function DectoHex(num){			
			return (num>>>0).toString(16);			
		}
		function HextoDec(str){
			return parseInt(str,16)&(2147483647*2+1);	
		}
		
		
		function apply(op,left,right){
			//alert("c1:"+left+ " "+right);
			left = HextoDec(left);
			right = HextoDec(right);

			//parseInt(left,16)&(2147483647*2+1);
			//right = parseInt(right,16)&(2147483647*2+1);
			//alert("c2:"+left+" "+right+" "+op);
				switch(op){				
					case "+":			
						//alert(">"+op+"< "+total+" "+r_num);
						
						total = parseInt(left)+parseInt(right);						
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						//total is int
						ans.innerHTML=DectoHex(total).toUpperCase();	
						l_num = DectoHex(total);
						//alert("end:" + total+"="+l_num);
						opt_st=1;
						
						break;
					case "-":
						total = parseInt(left)-parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						ans.innerHTML=DectoHex(total).toUpperCase();	
						l_num = DectoHex(total);
						opt_st=1;
						break;
					case "x":
						total = parseInt(left)*parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						ans.innerHTML=DectoHex(total).toUpperCase();	
						l_num = DectoHex(total);
						opt_st=1;
						break;
					case "%":
						total = parseInt(left)/parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						ans.innerHTML=DectoHex(total).toUpperCase();	
						l_num = DectoHex(total);
						opt_st=1;
						break;
					case "Mod":
						total = parseInt(left)%parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						ans.innerHTML=DectoHex(total).toUpperCase();
						l_num = DectoHex(total);
						opt_st=1;
						break;//*/
				}
				
					
		}
		
		function ANS(this_,t){			
			/*
			0 = number
			1 = operator
			2 = other function
			3= empty
			//*/			
			input = this_.innerHTML;
			ans = document.getElementById("ans");	
			r_num=ans.innerHTML;
			if(opt_st==2){r_num_log=r_num;}
			switch(t)
			{
				case 0:
				
					if(ans.innerHTML=="0"||opt_st==1){							
						ans.innerHTML = input; 
						
					}						
					else{						
						ans.innerHTML+=input;						
					}
					
					if(opt_st==1)opt_st=2;
					
					break;
					
				case 1:
					
					if(input=="="){	
						//alert("Calc" +l_num + r_num + ">>>>"+r_num_log) ;
						apply(op,l_num,r_num_log);

					}
					
					else{
						if(op==""&&opt_st==0)		
							{						
							
								op=input;								
								l_num=r_num;
								opt_st=1;
								document.getElementById("sign").innerHTML=op;
								//alert("first" +l_num + op);
							}
						else if(opt_st==1)
							{
								op=input;
								document.getElementById("sign").innerHTML=op;
								//alert("change" + op);
								
							}
						else if(opt_st==2){
							
							
							document.getElementById("sign").innerHTML=op;
							apply(op,l_num,r_num);
							op=input;
							
						}
							
					}
					
					break;
				
				case 2:
					switch(input){
						case "C":
								ans.innerHTML=0;
								total=0;								
								opt_st=0;
								l_num=0;
								r_num=0;
								r_num_log=0;
								op="";
								document.getElementById("sign").innerHTML="";
								break;
						case "CE":ans.innerHTML=0;break;
						case "←":
						tmp = ans.innerHTML;
						if(tmp.length>1)					
						ans.innerHTML=tmp.slice(0,tmp.length-1);						
						else
						ans.innerHTML=0;
						break;
						case "±":
							//(-1>>>0).toString(16)      2147483647*2+1
							tmp_dec = parseInt(ans.innerHTML,16)*(-1);
							ans.innerHTML = (tmp_dec>>>0).toString(16).toUpperCase(); 
							break;								
					}
				
					break;
				
				case 3:break;
			
			}
			log+=input;
			/*document.getElementById("HEX").innerHTML=total.toString(16);
			document.getElementById("DEC").innerHTML=total.toString(10);
			document.getElementById("OCT").innerHTML=total.toString(8);
			document.getElementById("BIN").innerHTML=total.toString(2);*/
			
			document.getElementById("HEX").innerHTML=parseInt(ans.innerHTML,16).toString(16);
			document.getElementById("DEC").innerHTML=HextoDec(ans.innerHTML,16);
			document.getElementById("OCT").innerHTML=parseInt(ans.innerHTML,16).toString(8);
			document.getElementById("BIN").innerHTML=parseInt(ans.innerHTML,16).toString(2);
		}
		