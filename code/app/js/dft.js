
function dft(signal) {
	const N = signal.length;
	const X = [];
	
	for (let k = 0; k < N; k++) {
		let re = 0;
		let im = 0;
		
		for (let n = 0; n < N; n++) {
			const phi = TWO_PI * k * n / N;
			
			re += signal[n].re*cos(phi) + signal[n].im*sin(phi);
			im += signal[n].im*cos(phi) - signal[n].re*sin(phi);
		}
		
		re /= N/4;
		im /= N/4;
		
		let freq = k;
		let amp = sqrt(re*re + im*im);
		let phase = atan2(im, re);
		X[k] = {re, im, freq, amp, phase};
	}
	
	return X;
}