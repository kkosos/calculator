	var total=0;
	var op="";		
	var opt_st=0;
	var l_num="0";
	var r_num="0";
	var r_num_log=0;
	var log=[];
	var stack=[];
	var	BASE_NOW=10;
	var curr="";
	var equal_c=false;
	var t;
	var Mode_id=["Dec","Hex","Bin","Oct"]
	
		function ChangeMode(last,now){			
			document.getElementById(Mode_id[last]).style.color="black";				
			document.getElementById(Mode_id[now%5]).style.color="red";	
		}
	
		function WTF(n){
			
			switch(n)
			{	//16 10 8 2
				
				case 0:	
						//ans.innerHTML=parseInt(ans.innerHTML,BASE_NOW).toString(16);
						ans.innerHTML=document.getElementById("HEX").innerHTML
						ChangeMode(BASE_NOW%5,16); 
						BASE_NOW=16;
						
					break;
				case 1:		
						//ans.innerHTML=parseInt(ans.innerHTML,BASE_NOW)&(2147483647*2+1);
						ans.innerHTML=document.getElementById("DEC").innerHTML
						
						ChangeMode(BASE_NOW%5,10);
						BASE_NOW=10;
					
					break;
				case 2:	
						//ans.innerHTML=parseInt(ans.innerHTML,BASE_NOW).toString(8);
						ans.innerHTML=document.getElementById("OCT").innerHTML
						
						ChangeMode(BASE_NOW%5,8);
						BASE_NOW=8;
					break;
				case 3:		
						//ans.innerHTML=parseInt(ans.innerHTML,BASE_NOW).toString(2);
						ans.innerHTML=document.getElementById("BIN").innerHTML
						
						ChangeMode(BASE_NOW%5,2);
						BASE_NOW=2;
					break;
				default:						
					console.log("error~~")
					BASE_NOW=10;
					break;
			}
			
		}
		//all converse to Dec
		function Conversion(num){
			switch(BASE_NOW)
			{	//16 10 8 2
				
				case 16:
					return parseInt(num,BASE_NOW)
					break;
				case 10:			
					return parseInt(num,BASE_NOW);	
					break;
				case 8:		
					return parseInt(num,BASE_NOW);	
					break;
				case 2:		
					return parseInt(num,BASE_NOW);		
					break;
				default:						
					console.log("error~~~")
					BASE_NOW=16;
					return parseInt(num,BASE_NOW);		
					break;
			}
		}
		
		function display(clear,ans_tmp){
			
			if(ans_tmp!="")//new value come in Hex
				{
				console.log("NOW:"+ans_tmp)
				ans.innerHTML=ans_tmp;					
				}
			switch(BASE_NOW){		
				case 10:					
					console.log("8")
					if(ans_tmp!=""){
						t=HextoDec(ans.innerHTML);
						ans.innerHTML=t;
					}						
					else{
						t=DectoHex(ans.innerHTML);
					}
					document.getElementById("HEX").innerHTML=parseInt(t,16).toString(16);
					document.getElementById("DEC").innerHTML=ans.innerHTML;
					document.getElementById("OCT").innerHTML=parseInt(t,16).toString(8);
					document.getElementById("BIN").innerHTML=parseInt(t,16).toString(2);					
					break;
				case 16:

					document.getElementById("DEC").innerHTML=HextoDec(ans.innerHTML);					
					document.getElementById("HEX").innerHTML=parseInt(ans.innerHTML,16).toString(16);				
					document.getElementById("OCT").innerHTML=parseInt(ans.innerHTML,16).toString(8);
					document.getElementById("BIN").innerHTML=parseInt(ans.innerHTML,16).toString(2);
					break;
				case 8:						
				case 2:
					
					if(ans_tmp!="")
					{
					document.getElementById("DEC").innerHTML=HextoDec(DectoHex(parseInt(ans.innerHTML,16)));
					document.getElementById("HEX").innerHTML=parseInt(ans.innerHTML,16).toString(16);				
					document.getElementById("OCT").innerHTML=parseInt(ans.innerHTML,16).toString(8);
					document.getElementById("BIN").innerHTML=parseInt(ans.innerHTML,16).toString(2);					
					ans.innerHTML=parseInt(ans_tmp,16).toString(BASE_NOW);
					}
					break;
				case 0:
					break;
				
			}
			if(clear){
				document.getElementById("DEC").innerHTML="0"
				document.getElementById("HEX").innerHTML="0"		
				document.getElementById("OCT").innerHTML="0"
				document.getElementById("BIN").innerHTML="0"
				
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
					post.push(log[i]);
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
			//console.log(post)
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
			//only work for opt_st
			//left = HextoDec(left);
			//right = HextoDec(right);
			opt_st=1;
			//console.log("NOW:"+log)
			display(0,DectoHex(ToPostFix(log.slice(0,log.length-1))));
			//parseInt(left,16)&(2147483647*2+1);
			//right = parseInt(right,16)&(2147483647*2+1);
			//alert("c2:"+left+" "+right+" "+op);
				switch(op){				
					case "+":			
						//alert(">"+op+"< "+total+" "+r_num);
						
						//total = parseInt(left)+parseInt(right);						
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						//total is int
						//display(BASE_NOW);
						//ans.innerHTML=DectoHex(total).toUpperCase();	
						//l_num = DectoHex(total);
						//alert("end:" + total+"="+l_num);
						opt_st=1;
						
						break;
					case "-":
						//total = parseInt(left)-parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						//display(BASE_NOW);
						//ans.innerHTML=DectoHex(total).toUpperCase();	
						//l_num = DectoHex(total);
						opt_st=1;
						break;
					case "*":
						//total = parseInt(left)*parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						//ans.innerHTML=DectoHex(total).toUpperCase();	
						//display(BASE_NOW);
						//l_num = DectoHex(total);
						opt_st=1;
						break;
					case "/":
						//total = parseInt(left)/parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						//ans.innerHTML=DectoHex(total).toUpperCase();	
						//display(BASE_NOW);
						//l_num = DectoHex(total);
						opt_st=1;
						break;
					case "Mod":
						//total = parseInt(left)%parseInt(right);	
						//alert("end:" + total+"="+left+ op +right +" "+opt_st);
						//ans.innerHTML=DectoHex(total).toUpperCase();
						//display(BASE_NOW);
						//l_num = DectoHex(total);
						opt_st=1;
						break;
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
			if(opt_st==2){r_num_log=Conversion(r_num);}
			switch(t)
			{
				case 0:
					
					if(ans.innerHTML=="0"||opt_st==1){							
						ans.innerHTML = input; 

						//to handle repeat equal
						if(equal_c){log=[];l_num="0"}	
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
							console.log(fixans)
							display(0,DectoHex(fixans));
							equal_c=true;
						}
						
							
					}
					
					else{
						
						if(op==""&&opt_st==0)		
							{						
								
								op=input;								
								l_num=r_num;
								//log(push)								
								log.push(Conversion(l_num));
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
							
							log.push(Conversion(r_num));
							log.push(input);
							document.getElementById("sign").innerHTML=op;
							apply(op,l_num,r_num);							
							op=input;
							//log(push)
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
								display(1,"");
								document.getElementById("sign").innerHTML="";
								log=[];
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
							//(-1>>>0).toString(16) <-can get Hex negative     2147483647*2+1	 <-in case of overflow						
							var tmp_dec = parseInt(ans.innerHTML,BASE_NOW)*(-1);
							if(opt_st==1)
							l_num=DectoHex(tmp_dec);
							if(opt_st==2)
							r_num=DectoHex(tmp_dec);
							var tmp_hex=(tmp_dec>>>0).toString(16).toUpperCase();
							
							switch(BASE_NOW){
								case 16:
									ans.innerHTML = tmp_hex;
									break;
								case 10:
									ans.innerHTML = tmp_dec.toString(10); 
									break;
								case 8:
									ans.innerHTML = parseInt(tmp_hex,16).toString(8); 
									
									break;
								case 2:
									ans.innerHTML = parseInt(tmp_hex,16).toString(2); 
									break;							
							}
						break;								
					}				
					break;				
				case 3:break;			
			}			
			display(0,"");		
		}
	function init(){
		document.getElementById("Dec").style.color="red";		
	}