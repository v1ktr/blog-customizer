import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyClasses,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type StateParams = {
	isOpen: boolean;
} & ArticleStateType;

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

	const [stateParams, setStateParams] = useState<StateParams>({
		isOpen: false,
		...defaultArticleState,
	});

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: stateParams.isOpen,
		rootRef,
		onChange: () =>
			setStateParams((prev) => ({ ...prev, isOpen: !prev.isOpen })),
	});

	const FontFamilyProps = {
		selected: stateParams.fontFamilyOption,
		options: fontFamilyOptions,
		placeholder: 'Выберите шрифт',
		title: 'Шрифт',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, fontFamilyOption: option })),
	};

	const FontColorsProps = {
		selected: stateParams.fontColor,
		options: fontColors,
		placeholder: 'Выберите цвет шрифта',
		title: 'Цвет шрифта',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, fontColor: option })),
	};

	const BackgroundColorsProps = {
		selected: stateParams.backgroundColor,
		options: backgroundColors,
		placeholder: 'Выберите цвет фона',
		title: 'Цвет фона',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, backgroundColor: option })),
	};

	const ContentWidthProps = {
		selected: stateParams.contentWidth,
		options: contentWidthArr,
		placeholder: 'Выберите ширину контента',
		title: 'Ширина контента',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, contentWidth: option })),
	};

	const FontSizeProps = {
		name: 'font-size',
		selected: stateParams.fontSizeOption,
		options: fontSizeOptions,
		title: 'Размер шрифта',
		onChange: (option: OptionType) =>
			setStateParams((prev) => ({ ...prev, fontSizeOption: option })),
	};

	const updateArticleState = () => {
		const newState: ArticleStateType = {
			fontFamilyOption: stateParams.fontFamilyOption,
			fontColor: stateParams.fontColor,
			backgroundColor: stateParams.backgroundColor,
			contentWidth: stateParams.contentWidth,
			fontSizeOption: stateParams.fontSizeOption,
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
			...defaultArticleState,
		}));
	};

	return (
		<>
			<ArrowButton
				isOpen={stateParams.isOpen}
				onClick={() =>
					setStateParams((prev) => ({ ...prev, isOpen: !prev.isOpen }))
				}
			/>
			<aside
				className={clsx(
					styles.container,
					stateParams.isOpen && styles.container_open
				)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.topContainer}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
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
