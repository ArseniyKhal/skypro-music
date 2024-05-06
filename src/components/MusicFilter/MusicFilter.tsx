import { useState, useEffect } from 'react'
import { MusicFilterComponentType, TrackType, MusicFilterItemType, MusicSortItemType } from '../../types'
import * as S from './Filter.styles'

export const MusicFilter = ({ setMusic, musicList, isLoading }: MusicFilterComponentType) => {
	// отображение/скрытие меню фильтра
	const [visibleFilter, setVisibleFilter] = useState("")
	const toggleVisibleFilter = (filter = "") => {
		setVisibleFilter(visibleFilter === filter ? "" : filter)
	}
	const [authorFilter, setAuthorFilter] = useState<string[]>([])
	const [genreFilter, setGenreFilter] = useState<string[]>([])
	const [selectedSort, setSelectedSort] = useState('По умолчанию')

	useEffect(() => {
		if (
			!authorFilter.length &&
			!genreFilter.length &&
			selectedSort === 'По умолчанию'
		) {
			setMusic(musicList)
		} else {
			// ======================= ФИЛЬТР ПО АВТОРУ ==========================
			let authorList: TrackType[] = []
			if (authorFilter.length) {
				for (let i = 0; i < authorFilter.length; i++) {
					const result = musicList.filter((el) => el.author === authorFilter[i])
					authorList = [...authorList, ...result]
				}
			} else {
				authorList = musicList
			}

			// ======================= ФИЛЬТР ПО ЖАНРУ ==========================
			let genreList: TrackType[] = []
			if (genreFilter.length) {
				for (let i = 0; i < genreFilter.length; i++) {
					const result = authorList.filter((el) => el.genre === genreFilter[i])
					genreList = [...genreList, ...result]
				}
			} else {
				genreList = authorList
			}

			// ======================= СОРТИРОВКА ПО ДАТЕ ============================
			let sortList: TrackType[] | string = []
			if (selectedSort !== 'По умолчанию') {
				// проверка на нулевую дату
				const dateList = genreList.filter((el: TrackType) => el.release_date !== null)
				if (selectedSort === 'Сначала новые') {
					sortList = dateList.sort((a, b) => {
						if (a.release_date && b.release_date) {
							return a.release_date < b.release_date ? 1 : -1
						}
						return 0;
					})
				} else {
					sortList = dateList.sort((a: TrackType, b: TrackType) => {
						if (a.release_date && b.release_date) {
							return a.release_date > b.release_date ? 1 : -1
						}
						return 0;
					})
				}
				sortList = [
					...sortList,
					...genreList.filter((el) => el.release_date === null),
				]
			} else {
				sortList = genreList
			}
			setMusic(sortList as TrackType[])
		}
	}, [authorFilter, genreFilter, selectedSort, musicList])

	return (
		<S.CenterblockFilter>
			<S.FilterSearc>
				<S.FilterTitle>Искать по:</S.FilterTitle>
				<MusicFilterItem
					title="исполнителю"
					filterList={Array.from(
						new Set(musicList?.map((track) => track.author)),
					)}
					isLoading={isLoading}
					visibleFilter={visibleFilter}
					toggleVisibleFilter={toggleVisibleFilter}
					authorFilter={authorFilter}
					setAuthorFilter={setAuthorFilter}
					genreFilter={genreFilter}
					setGenreFilter={setGenreFilter}
				/>
				<MusicFilterItem
					title="жанру"
					filterList={Array.from(
						new Set<string>(
							musicList?.map((track) => track.genre)
								.filter((genre): genre is string => typeof genre === 'string')
						)
					)}
					isLoading={isLoading}
					visibleFilter={visibleFilter}
					toggleVisibleFilter={toggleVisibleFilter}
					authorFilter={authorFilter}
					setAuthorFilter={setAuthorFilter}
					genreFilter={genreFilter}
					setGenreFilter={setGenreFilter}
				/>
			</S.FilterSearc>
			<S.FilterSort>
				<S.FilterTitle>Сортировка:</S.FilterTitle>
				<MusicSortItem
					title="году выпуска"
					filterList={['По умолчанию', 'Сначала новые', 'Сначала старые']}
					isLoading={isLoading}
					visibleFilter={visibleFilter}
					toggleVisibleFilter={toggleVisibleFilter}
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
				/>
			</S.FilterSort>
		</S.CenterblockFilter>
	)
}

// компонент фильтра
const MusicFilterItem = ({
	title,
	filterList,
	isLoading,
	visibleFilter,
	toggleVisibleFilter,
	authorFilter,
	setAuthorFilter,
	genreFilter,
	setGenreFilter,
}: MusicFilterItemType) => {
	// фильтр
	const [selectedFilter, setSelectedFilter] = useState<string[]>([])
	// выбираем критерый фильтрации
	const toggleFilter = (filterListItem: string) => {
		if (title === 'исполнителю') {
			if (authorFilter?.includes(filterListItem)) {
				setAuthorFilter(authorFilter.filter((e) => e !== filterListItem))
			} else {
				setAuthorFilter([...authorFilter, filterListItem])
			}
		} else if (title === 'жанру') {
			if (genreFilter?.includes(filterListItem)) {
				setGenreFilter(genreFilter.filter((e) => e !== filterListItem))
			} else {
				setGenreFilter([...genreFilter, filterListItem])
			}
		} else {
			return
		}

		if (selectedFilter?.includes(filterListItem)) {
			setSelectedFilter(selectedFilter.filter((e) => e !== filterListItem))
		} else {
			setSelectedFilter([...selectedFilter, filterListItem])
		}
	}
	return (
		<S.FilterItem
			style={{ pointerEvents: isLoading ? 'none' : "auto" }}
		>
			<S.FilterButton
				onClick={() => toggleVisibleFilter(title)}
				className="_btn-text"
				style={{
					borderColor: visibleFilter === title ? '#9A48F1' : '',
					color: visibleFilter === title ? '#9A48F1' : '',
				}}
			>
				{title}
			</S.FilterButton>
			{
				selectedFilter?.length > 0 && (
					<S.FilterLabel>{selectedFilter.length}</S.FilterLabel>
				)
			}

			{
				visibleFilter === title && (
					<S.FilterMenu>
						<S.FilterContent>
							<S.FilterList>
								{filterList.map((filterListItem: string) => (
									<S.FilterText
										key={filterListItem}
										style={{
											color: selectedFilter?.includes(filterListItem) ? '#b672ff' : '',
											fontWeight: selectedFilter?.includes(filterListItem) ? '600' : '',
										}}

										onClick={() => toggleFilter(filterListItem)}
									>
										{filterListItem}
									</S.FilterText>
								))}
							</S.FilterList>
						</S.FilterContent>
					</S.FilterMenu>
				)
			}
		</S.FilterItem >
	)
}

// компонент сортировщика
const MusicSortItem = ({
	title,
	filterList,
	isLoading,
	visibleFilter,
	toggleVisibleFilter,
	selectedSort,
	setSelectedSort,
}: MusicSortItemType) => (
	<S.FilterItem
		// disabled={{ isLoading }}
		//  style={{ pointerEvents: isLoading && 'none' }}
		// Так не работает!!
		style={{ pointerEvents: isLoading ? 'none' : "auto" }}
	>
		<S.FilterButton
			onClick={() => toggleVisibleFilter(title)}
			className="_btn-text"
			style={{
				borderColor: visibleFilter === title ? '#9A48F1' : '',
				color: visibleFilter === title ? '#9A48F1' : '',
			}}
		>
			{selectedSort}
		</S.FilterButton>
		{selectedSort !== 'По умолчанию' && <S.FilterLabel>1</S.FilterLabel>}
		{visibleFilter === title && (
			<S.FilterMenu style={{ right: '0px', left: 'auto' }}>
				<S.FilterContent>
					<S.FilterList>
						{filterList.map((track) => (
							<S.FilterText
								key={track}
								style={{
									color: selectedSort?.includes(track) ? '#b672ff' : '',
									fontWeight: selectedSort?.includes(track) ? '600' : '',
								}}
								onClick={() => setSelectedSort(track)}
							>
								{track}
							</S.FilterText>
						))}
					</S.FilterList>
				</S.FilterContent>
			</S.FilterMenu>
		)}
	</S.FilterItem>
)
