import { Button } from '@/components/ui/button'
import { convertToPathname } from '@/helpers/cleanString'
import { cn } from '@/lib/utils'
import { MovieDetail, MovieDetailResponse } from '@/models/interfaces/detail'
import { Database } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface PlayerEpisodeProps {
  dataEpisode: MovieDetail['episodes']
  detail: MovieDetail
  normalizeEpisodeSlug: (slug: string) => string
  handleEpisodeClick: (episode: string, lang: string) => void
}

const PlayerEpisode = (props: PlayerEpisodeProps) => {
  const { dataEpisode, detail, normalizeEpisodeSlug, handleEpisodeClick } = props

  const searchParams = useSearchParams()
  const episodeParam = searchParams.get('episode') as string
  const langParam = searchParams.get('lang') as string

  const getServerName = (data: MovieDetail['episodes'][0]): string =>
    data.server_name.match(/\((.*?)\)/)?.[1] || ''

  return (
    <div className='grid gap-2'>
      <span className='text-lg max-sm:text-[15px] flex items-center gap-1 font-semibold capitalize sticky top-0'>
        <Database size={14} />
        Danh sách tập
      </span>
      <div
        className={cn('grid gap-5', {
          'flex items-center gap-2': dataEpisode[0]?.server_data.length <= 2,
        })}
      >
        {dataEpisode.map((item) => (
          <div
            key={item.server_name}
            className='grid gap-3'
          >
            <span
              className={cn('text-base font-semibold sticky top-0 pb-2 border-b border-white/10', {
                hidden:
                  !getServerName(item) ||
                  dataEpisode.length < 2 ||
                  dataEpisode[0]?.server_data.length <= 2,
              })}
            >
              # {getServerName(item)}
            </span>
            <div
              className={cn(
                'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-2 max-h-[300px] max-sm:max-h-[200px] overflow-x-hidden overflow-y-auto',
                {
                  flex: dataEpisode[0]?.server_data.length <= 2,
                },
              )}
            >
              {item.server_data.map((episode, episodeIndex) => {
                const isLastEpisode =
                  episodeIndex > 0 && episodeIndex === Number(detail.episode_total) - 1
                const isLongTieng =
                  item.server_name?.toLowerCase().includes('lồng tiếng') &&
                  !item.server_name?.toLowerCase().includes('vietsub')
                const isThuyetMinh =
                  item.server_name?.toLowerCase().includes('thuyết minh') &&
                  !item.server_name?.toLowerCase().includes('vietsub')

                const episodeOptions = isThuyetMinh
                  ? 'Thuyết minh'
                  : isLongTieng
                    ? 'Lồng tiếng'
                    : 'Vietsub'

                const displayText = !['full', 'tap-dac-biet', 'long-tieng', 'thuyet-minh'].includes(
                  episode.slug?.toLowerCase(),
                )
                  ? episode.name.split(' ')[1]
                  : dataEpisode[0]?.server_data.length === 1
                    ? episodeOptions
                    : episode.name.toLowerCase().includes('full')
                      ? 'Vietsub'
                      : episode.name

                const isActiveEpisode =
                  (langParam?.includes(`${convertToPathname(episodeOptions)}`) &&
                    normalizeEpisodeSlug(episodeParam) === normalizeEpisodeSlug(episode.slug)) ||
                  (episodeIndex === 0 &&
                    episodeParam?.includes('01') &&
                    langParam?.includes(`${convertToPathname(episodeOptions)}`))

                return (
                  <Button
                    key={`${item.server_name}-${episode.slug}-${episodeIndex}`}
                    className={cn(
                      `text-sm h-fit min-w-fit hover:bg-primary-color hover:text-black rounded-sm text-center p-2 cursor-pointer text-nowrap bg-zinc-300/5`,
                      { 'bg-primary-color text-black': isActiveEpisode },
                      { 'min-w-[100px]': dataEpisode[0]?.server_data.length <= 2 },
                    )}
                    onClick={() =>
                      handleEpisodeClick(
                        episode.slug,
                        item.server_data.length <= 1
                          ? getServerName(item)
                          : detail.type === 'single'
                            ? episode.slug
                            : getServerName(item),
                      )
                    }
                  >
                    {displayText}
                    {isLastEpisode && ' END'}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayerEpisode
