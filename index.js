const canvas = document.getElementById('drawingCanvas');
			const context = canvas.getContext('2d');
			let isDrawing = false;
			let currentColor = 'black';
			let eraserSize = 5;
			let brushSize = 5;
		
			function draw(e) {
				if (!isDrawing) return;
		
				const rect = canvas.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
		
				context.lineTo(x, y);
				context.strokeStyle = currentColor;
				context.lineWidth = currentColor === 'white' ? eraserSize * 5 : brushSize;
				context.stroke();
				
			}
		
			function setColor(color) {
				currentColor = color;
			}
		
			function setEraser() {
				currentColor = 'white';
			}
		
			function setEraserSize(size) {
				eraserSize = size;
				document.getElementById('eraserSizeValue').textContent = size;
			}
		
			function setBrushSize(size) {
				brushSize = size;
				document.getElementById('brushSizeValue').textContent = size;
			}
		
			canvas.addEventListener('mousedown', (e) => {
				isDrawing = true;
				context.beginPath();
				context.moveTo(e.offsetX, e.offsetY);
				canvas.addEventListener('mousemove', draw);
			});
		
			canvas.addEventListener('mouseup', () => {
				isDrawing = false;
				canvas.removeEventListener('mousemove', draw);
			});
		
			canvas.addEventListener('mouseout', () => {
				isDrawing = false;
				canvas.removeEventListener('mousemove', draw);
			});