'use client';

import { useRef, useEffect, useState } from 'react'
import gsap from "gsap";
import { SlotMachineTextProps } from "@/types/props";

//https://gsap.com/docs/v3/Eases
export default function useSlotMachineText({firstText, secondText, IterationCount, RunningInterval, delay}: SlotMachineTextProps) {
	const slotText = useRef<(HTMLDivElement | null)[]>([]); // 개별 문자 요소들의 ref 배열
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 랜덤 문자 집합
	const [isVisible, setIsVisible] = useState(false); // 초기에는 숨김 상태

	useEffect(() => {
		let iterations = 0; // 반복 횟수 추적하기 위한 변수

		const delayTimeout = setTimeout(()=> {
			setIsVisible(true); // delay 이후 요소 보임

			const interval = setInterval(() => {
				slotText.current.forEach((ref) => {
					if (ref) {
						const randomChar = chars[Math.floor(Math.random() * chars.length)]; // 랜덤 문자 선택
						ref.innerText = randomChar;
	
						// 텍스트 크기 점점 커지는 애니메이션
						gsap.to(ref, { color: "var(--thema)", fontSize: `${(7.2 + iterations * 0.05)}rem`, filter: `blur(${10 - iterations * 0.2}px)`, duration: 0.3 });
					}
				});
	
				iterations++;
	
				if (iterations > IterationCount) { // 반복 횟수
					clearInterval(interval);
	
					slotText.current.forEach((ref, index) => {
						if (ref) {
							const allText = firstText + secondText; // 모든 텍스트 합치기
							ref.innerText = allText[index]; // ✅ 최종 목표 문자로 변경
							gsap.to(ref, {
								opacity: 1,
								duration: 0.5,
								onComplete: () => {
									applyFinalAnimation(ref, index)
								}
							}); // 애니메이션 적용
						}
					});
				}
			}, RunningInterval); // 함수의 실행 간격

			return () => clearInterval(interval); // 언마운트 시 해제
		}, delay); // 딜레이 시간

		return () => clearTimeout(delayTimeout); // 언마운트 시 해제
	}, [firstText, secondText, IterationCount, RunningInterval, delay]); // firstText, secondText 변경 시 애니메이션 재실행

	const applyFinalAnimation = (ele: HTMLDivElement, index: number) => {
		gsap.to(ele, {
			filter: `blur(4px)`,
			delay: index * 0.25, // index에 비례한 딜레이 적용
			duration: 1.5, // 애니메이션 지속시간
			repeat: -1, // -1은 무한 반복
			yoyo: true, // 애니메이션이 완료 후 반대 방향으로 실행
			ease: "power1.inOut"
		});
	};

	return { slotText, isVisible };
}