import Image from "next/image";
import useMouseEffect from "@/hooks/useMouseEffect";

export default function ProfileCard() {
	const { handleMouseMove, profileHandleMouseLeave, imageNumber } = useMouseEffect();

	return (
		<div className="profile_card" onMouseMove={handleMouseMove} onMouseLeave={profileHandleMouseLeave}>
			<div className="profile_image">
				<Image src={`/images/profile/profile${imageNumber}.jpg`} alt="profile_image" draggable={false} fill
					sizes="(max-width: 1536px) 28rem, 35rem"
					style={{ objectFit: "cover", borderRadius: ".8rem" }} 
					onDragStart={(e) => e.preventDefault()}
					onContextMenu={(e) => e.preventDefault()}
				/>
			</div>
			{ /* Image 컴포넌트의 borderRadius는 나중에 이직 시 제거해야함 */ }
			{/* <div className="profile_content">
				<div className="profile_header">
					<div className="name">이태윤&#40;李太綸&#41;</div>
					<div className="profile_info">
						<div className="age">남, 1996년&#40;29세&#41;</div>
						<div className="location">경기도 광주시</div>
					</div>
				</div>
				<div className="contact">vpdlvj90@naver.com</div>
			</div> */}
		</div>
	)
}
