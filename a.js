	var total="0";
	var op="";		
	var opt_st=0;
	var l_num="0";
	var r_num="0";
	var r_num_log=0;
	var log=[];
	var stack=[];
	var	BASE_NOW=16;
	var equal_c=false;
		function WTF(n){
			
			switch(n)
			{	//16 10 8 2
				
				case 0:	
						BASE_NOW=16;
					break;
				case 1:			
						BASE_NOW=10;
					break;
				case 2:		
						BASE_NOW=8;
					break;
				case 3:		
						BASE_NOW=2;
					break;
				
			}
			
		}
		
		function DectoHex(num){			
			return (num>>>0).toString(16);			
		}
		function HextoDec(str){
			return parseInt(str,16)&(2147483647*2+1);	
		}
		function ToPostFix(log){
			
			//console.log("POST");
			
			//console.log(log);
			var i=0;
			post=[];
			stack=[];
			while(i<log.length)
			{
				switch(log[i])
				{
				case "+":
				case "-":					
				case "*":
				case "/":
					stack.push(log[i]);
					break;
				case "Mod":
					stack.push("%");
					break;
					
				default : 
					//16 to 10
					post.push(parseInt(log[i],16)|0);
					//console.log(post);
					if(!stack.length)break;
					tmp = stack[stack.length-1];
					if(tmp=="*"||tmp=="/"||tmp=="%")//top
						{
							var n2=Number(post.pop());
							var n1=Number(post.pop());
							var op_t=stack.pop();
							switch(op_t){								
								case "*":
								
								post.push(n1*n2);break;
								case "/":
								post.push(n1/n2);break;
								case "%":								
								post.push(n1%n2);								
								break;
								
							}							
						}				
					break;			
				}
				i++;
			}
			for(var i=1;i<post.length;i++){
				if(stack[i-1]=="+")
					post[0]+=post[i]
				else if(stack[i-1]=="-")
					post[0]-=post[i]
				else console.log(stack[i-1])
				
				
			}
			return post[0];
			
					
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
					case "*":
						total = parseInt(left)*parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						ans.innerHTML=DectoHex(total).toUpperCase();	
						l_num = DectoHex(total);
						opt_st=1;
						break;
					case "/":
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
			
			//console.log(input);
			//console.log(typeof(input));
			ans = document.getElementById("ans");	
			r_num=ans.innerHTML;
			if(opt_st==2){r_num_log=r_num;}
			switch(t)
			{
				case 0:
					
					if(ans.innerHTML=="0"||opt_st==1){							
						ans.innerHTML = input; 

						//to handle repeat equal
						if(equal_c){log=[];l_num=0}	
						equal_c=false;
						
					}						
					else{						
						ans.innerHTML+=input;	
				
					}
					
					if(opt_st==1)opt_st=2;
					
					break;
					
				case 1:
					
					if(input=="="){	
						//alert("Calc" +l_num + r_num + ">>>>"+r_num_log) ;
						
						log.push(r_num_log);
						console.log(l_num,log);
						apply(op,l_num,r_num_log);
						//first equal
						if(!equal_c){
							var fixans=ToPostFix(log);				
							
							var t=parseInt(ans.innerHTML,16);
							if(t!=fixans)
							ans.innerHTML=DectoHex(fixans).toUpperCase();
							equal_c=true;
						}
						
							
					}
					
					else{
						
						if(op==""&&opt_st==0)		
							{						
								
								op=input;								
								l_num=r_num;
								//log(push)
								log.push(l_num);
								log.push(input);
								opt_st=1;
								document.getElementById("sign").innerHTML=op;
								//alert("first" +l_num + op);
							}
						else if(opt_st==1)
							{
								op=input;
								log[log.length-1]=input;
								document.getElementById("sign").innerHTML=op;
								//alert("change" + op);
								
							}
						else if(opt_st==2){
							
							document.getElementById("sign").innerHTML=op;
							apply(op,l_num,r_num);
							
							op=input;
							//log(push)
							log.push(r_num);						
							log.push(input);
						}
							
					}
					
					break;
				
				case 2:
					switch(input){
						case "CE":
								ans.innerHTML=0;
								total=0;								
								opt_st=0;
								l_num=0;
								r_num=0;
								r_num_log=0;
								op="";
								document.getElementById("sign").innerHTML="";
								log=[];
								break;
						case "C":ans.innerHTML=0;break;
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
							if(opt_st==1)
							l_num=DectoHex(tmp_dec);
							if(opt_st==2)
							r_num=DectoHex(tmp_dec);


							ans.innerHTML = (tmp_dec>>>0).toString(16).toUpperCase(); 
							break;								
					}
				
					break;
				
				case 3:break;
			
			}
			/*document.getElementById("HEX").innerHTML=total.toString(16);
			document.getElementById("DEC").innerHTML=total.toString(10);
			document.getElementById("OCT").innerHTML=total.toString(8);
			document.getElementById("BIN").innerHTML=total.toString(2);*/
			//console.log(log);
			document.getElementById("HEX").innerHTML=parseInt(ans.innerHTML,16).toString(16);
			document.getElementById("DEC").innerHTML=HextoDec(ans.innerHTML,16);
			document.getElementById("OCT").innerHTML=parseInt(ans.innerHTML,16).toString(8);
			document.getElementById("BIN").innerHTML=parseInt(ans.innerHTML,16).toString(2);
		}
		