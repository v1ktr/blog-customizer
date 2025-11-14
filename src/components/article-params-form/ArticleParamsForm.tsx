import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType,
	fontFamilyClasses,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

type StateParams = {
	isOpen: boolean;
	fontFamily: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSize: OptionType;
};

type ArticleParamsFormProps = {
	onReset: () => void;
	onUpdate: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const fontFamilyOptions: OptionType[] = fontFamilyClasses.map((font) => {
		const title = font
			.split('-')
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(' ');

		return {
			title,
			value: font,
			className: font,
		};
	});

	const [StateParams, setStateParams] = useState<StateParams>({
		isOpen: false,
		fontFamily: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSize: fontSizeOptions[0],
	});

	const FontFamilyProps = {
		selected: StateParams.fontFamily,
		options: fontFamilyOptions,
		placeholder: 'Выберите шрифт',
		title: 'Шрифт',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, fontFamily: option })),
	};

	const FontColorsProps = {
		selected: StateParams.fontColor,
		options: fontColors,
		placeholder: 'Выберите цвет шрифта',
		title: 'Цвет шрифта',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, fontColor: option })),
	};

	const BackgroundColorsProps = {
		selected: StateParams.backgroundColor,
		options: backgroundColors,
		placeholder: 'Выберите цвет фона',
		title: 'Цвет фона',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, backgroundColor: option })),
	};

	const ContentWidthProps = {
		selected: StateParams.contentWidth,
		options: contentWidthArr,
		placeholder: 'Выберите ширину контента',
		title: 'Ширина контента',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, contentWidth: option })),
	};

	const FontSizeProps = {
		name: 'font-size',
		selected: StateParams.fontSize,
		options: fontSizeOptions,
		title: 'Размер шрифта',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, fontSize: option })),
	};

	const updateArticleState = () => {
		const newState: ArticleStateType = {
			fontFamilyOption: StateParams.fontFamily,
			fontColor: StateParams.fontColor,
			backgroundColor: StateParams.backgroundColor,
			contentWidth: StateParams.contentWidth,
			fontSizeOption: StateParams.fontSize,
		};
		props.onUpdate(newState);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateArticleState();
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onReset();
		setStateParams((prev) => ({
			...prev,
			fontFamily: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSize: fontSizeOptions[0],
		}));
	};

	return (
		<>
			<ArrowButton
				isOpen={StateParams.isOpen}
				onClick={() =>
					setStateParams((prev) => ({ ...prev, isOpen: !prev.isOpen }))
				}
			/>
			<aside
				className={
					StateParams.isOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.topContainer}>
						<h2 className={styles.formTitle}>Задайте параметры</h2>
						<Select {...FontFamilyProps} />
						<RadioGroup {...FontSizeProps} />
						<Select {...FontColorsProps} />
						<Separator />
						<Select {...BackgroundColorsProps} />
						<Select {...ContentWidthProps} />
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
