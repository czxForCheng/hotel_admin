import { getTime, updateTime } from '@/api/setting/config'
import { defineStore } from 'pinia'
interface TimeSate {
    timeZoneAll: any,
    timeZoomText: String,
    timeZoom: String,
    timeZoomI: number
}

const useTimeStore = defineStore({
    id: 'time',
    state: (): TimeSate => {
        return {
            timeZoneAll: [
                { id: 1, label: '中国上海', value: 'Asia/Shanghai', zoomi: 8 },
                { id: 2, label: '美国东部', value: 'America/Detroit', zoomi: -5 },
                { id: 3, label: '英国', value: 'Europe/London', zoomi: 0},
                { id: 4, label: '巴西', value: 'America/Sao_Paulo', zoomi: -3 },
                { id: 5, label: '墨西哥', value: 'America/Mexico_City', zoomi: -6 },
                { id: 6, label: '印度尼西亚', value: 'Asia/Jakarta', zoomi: 7 },
                { id: 7, label: '越南', value: 'Asia/Ho_Chi_Minh', zoomi: 7 },
                { id: 8, label: '土耳其', value: 'Europe/Istanbul', zoomi: 2 },
                { id: 9, label: '澳大利亚', value: 'Australia/Sydney', zoomi: 9 },
                { id: 10, label: '泰国', value: 'Asia/Bangkok', zoomi: 8 },
                { id: 11, label: '俄罗斯', value: 'Europe/Moscow', zoomi: 3 },
                { id: 12, label: '波兰', value: 'Europe/Warsaw', zoomi: 8 },
                { id: 13, label: '日本', value: 'Asia/Tokyo', zoomi: 9 },
                { id: 14, label: '西班牙', value: 'Europe/Madrid', zoomi: 1 },
                { id: 15, label: '加拿大', value: 'America/Toronto', zoomi: -4 }
            ],
            timeZoomText: '',
            timeZoom: '',
            timeZoomI: 0
        }
    },
    actions: {
        getTimeZoom() {
            return new Promise((resolve, reject) => {
                getTime().then(res => {
                        this.timeZoom = res.setTimeZone
                        //@ts-ignore
                        const item = this.timeZoneAll.find(item1 => {
                            return item1.value === res.setTimeZone
                        })
                        this.timeZoomText = item.label
                        this.timeZoomI = item.zoomi
                        resolve(res.setTimeZone)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        setTimeZoom(timeRes: String) {
            return new Promise((resolve, reject) => {
                updateTime({ setTimeZone: timeRes }).then(res => {
                    this.timeZoom = timeRes
                    //@ts-ignore
                    const item = this.timeZoneAll.find(item1 => {
                        return item1.value === timeRes
                    })
                    this.timeZoomText = item.label
                    this.timeZoomI = item.zoomi
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})

export default useTimeStore
