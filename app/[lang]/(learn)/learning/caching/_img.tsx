'use client';

const Img = (props: { blob: Blob }) => {
	return (
		<img
			width={300}
			height={300}
			src={URL.createObjectURL(props.blob)}
			alt="random image"
		/>
	);
};

export default Img;
